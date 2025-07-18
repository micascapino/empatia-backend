import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Psychologist, TimeSlot } from '../../../../src/entities';

@Injectable()
export class PsychologistRepository {
  private readonly logger = new Logger(PsychologistRepository.name);
  private readonly psychologistRepository: Repository<Psychologist>;
  private readonly timeSlotRepository: Repository<TimeSlot>;

  constructor(private readonly dataSource: DataSource) {
    this.psychologistRepository = this.dataSource.getRepository(Psychologist);
    this.timeSlotRepository = this.dataSource.getRepository(TimeSlot);
  }

  private getTodayStart(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  async findAll(): Promise<Psychologist[]> {
    try {
      const today = this.getTodayStart();

      const result = await this.psychologistRepository
        .createQueryBuilder('psychologist')
        .addSelect(`
          (SELECT COUNT(*) 
           FROM time_slots ts 
           WHERE ts.psychologist_id = psychologist.id 
           AND ts.available = true 
           AND ts.start_date >= :today)`, 'availableSlotsCount')
        .setParameter('today', today)
        .orderBy('psychologist.name', 'ASC')
        .getRawAndEntities();

      return result.entities.map((psychologist, index) => ({
        ...psychologist,
        availableSlotsCount: parseInt(result.raw[index].availableSlotsCount) || 0,
      }));
    } catch (error) {
      this.logger.error('Error finding all psychologists', error);
      throw error;
    }
  }



  async findByIdWithTimeSlots(id: string): Promise<Psychologist | null> {
    try {
      const psychologist = await this.psychologistRepository.findOne({
        where: { id },
      });

      if (!psychologist) {
        return null;
      }

      const today = this.getTodayStart();

      const availableTimeSlots = await this.timeSlotRepository.find({
        where: {
          psychologistId: id,
          available: true,
        },
        order: {
          startDate: 'ASC',
        },
      });

      const filteredTimeSlots = availableTimeSlots.filter(slot => {
        const slotDate = new Date(slot.startDate);
        return slotDate >= today;
      });

      return {
        ...psychologist,
        timeSlots: filteredTimeSlots,
      };
    } catch (error) {
      this.logger.error(`Error finding psychologist with time slots - ID: ${id}`, error);
      throw error;
    }
  }



  async findAvailableTimeSlotsInDateRange(
    startDate: string,
    endDate: string
  ): Promise<TimeSlot[]> {
    try {
      const startDateTime = new Date(startDate + 'T00:00:00.000Z');
      const endDateTime = new Date(endDate + 'T23:59:59.999Z');
      const today = this.getTodayStart();

      return await this.timeSlotRepository
        .createQueryBuilder('timeSlot')
        .leftJoinAndSelect('timeSlot.psychologist', 'psychologist')
        .where('timeSlot.available = :available', { available: true })
        .andWhere('timeSlot.start_date >= :startDateTime', { startDateTime })
        .andWhere('timeSlot.start_date <= :endDateTime', { endDateTime })
        .andWhere('timeSlot.start_date >= :today', { today })
        .orderBy('timeSlot.start_date', 'ASC')
        .getMany();
    } catch (error) {
      this.logger.error(`Error finding time slots in date range: ${startDate} to ${endDate}`, error);
      throw error;
    }
  }

  async findTimeSlotById(timeSlotId: string): Promise<TimeSlot | null> {
    try {
      return await this.timeSlotRepository.findOne({
        where: { id: timeSlotId },
        relations: ['psychologist'],
      });
    } catch (error) {
      this.logger.error(`Error finding time slot by ID: ${timeSlotId}`, error);
      throw error;
    }
  }



  async bookTimeSlot(
    timeSlotId: string,
    userId: string,
    bookingNotes?: string,
    sessionType?: 'virtual' | 'clinic'
  ): Promise<TimeSlot> {
    try {
      const timeSlot = await this.timeSlotRepository.findOne({
        where: { id: timeSlotId },
        relations: ['psychologist'],
      });

      if (!timeSlot) {
        throw new NotFoundException('Time slot not found');
      }

      if (!timeSlot.available) {
        throw new BadRequestException('Time slot is not available');
      }

      timeSlot.available = false;
      timeSlot.userId = userId;
      timeSlot.bookingNotes = bookingNotes;

      if (sessionType === 'virtual') {
        timeSlot.clinicSession = false;
      } else if (sessionType === 'clinic') {
        timeSlot.virtualSession = false;
      }

      const savedTimeSlot = await this.timeSlotRepository.save(timeSlot);
      this.logger.log(`Time slot booked successfully - ID: ${timeSlotId}, User: ${userId}`);
      
      return savedTimeSlot;
    } catch (error) {
      this.logger.error(`Error booking time slot - ID: ${timeSlotId}, User: ${userId}`, error);
      throw error;
    }
  }
} 