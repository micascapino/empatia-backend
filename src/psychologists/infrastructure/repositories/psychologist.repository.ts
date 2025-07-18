import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Psychologist, TimeSlot, User } from '@/entities';


@Injectable()
export class PsychologistRepository {
  constructor(
    @InjectRepository(Psychologist)
    private psychologistRepository: Repository<Psychologist>,
    @InjectRepository(TimeSlot)
    private timeSlotRepository: Repository<TimeSlot>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Psychologist[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await this.psychologistRepository
      .createQueryBuilder('psychologist')
      .addSelect(`
        (SELECT COUNT(*) 
         FROM time_slots ts 
         WHERE ts.psychologist_id = psychologist.id 
         AND ts.available = true 
         AND ts.start_date >= :today)`, 'availableSlotsCount')
      .setParameter('today', today)
      .orderBy('psychologist.name', 'ASC')
      .getRawAndEntities()
      .then(result => {
        return result.entities.map((psychologist, index) => ({
          ...psychologist,
          availableSlotsCount: parseInt(result.raw[index].availableSlotsCount) || 0,
        }));
      });
  }

  async findById(id: string): Promise<Psychologist | null> {
    return await this.psychologistRepository.findOne({
      where: { id },
    });
  }

  async findByIdWithTimeSlots(id: string): Promise<Psychologist | null> {
    const psychologist = await this.psychologistRepository.findOne({
      where: { id },
    });

    if (!psychologist) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
  }

  async findAvailableTimeSlots(psychologistId: string): Promise<TimeSlot[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const timeSlots = await this.timeSlotRepository.find({
      where: {
        psychologistId,
        available: true,
      },
      relations: ['user'],
      order: {
        startDate: 'ASC',
      },
    });

    return timeSlots.filter(slot => {
      const slotDate = new Date(slot.startDate);
      return slotDate >= today;
    });
  }

  async findAvailableTimeSlotsInDateRange(
    startDate: string,
    endDate: string
  ): Promise<TimeSlot[]> {
    const startDateTime = new Date(startDate + 'T00:00:00.000Z');
    const endDateTime = new Date(endDate + 'T23:59:59.999Z');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await this.timeSlotRepository
      .createQueryBuilder('timeSlot')
      .leftJoinAndSelect('timeSlot.psychologist', 'psychologist')
      .where('timeSlot.available = :available', { available: true })
      .andWhere('timeSlot.start_date >= :startDateTime', { startDateTime })
      .andWhere('timeSlot.start_date <= :endDateTime', { endDateTime })
      .andWhere('timeSlot.start_date >= :today', { today })
      .orderBy('timeSlot.start_date', 'ASC')
      .getMany();
  }

  async findTimeSlotById(timeSlotId: string): Promise<TimeSlot | null> {
    return await this.timeSlotRepository.findOne({
      where: { id: timeSlotId },
      relations: ['psychologist'],
    });
  }

  async findOrCreateUser(userData: {
    name: string;
    email: string;
    phone?: string;
    notes?: string;
  }): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { email: userData.email }
    });

    if (!user) {
      user = this.userRepository.create({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        notes: userData.notes,
        active: true,
      });
      await this.userRepository.save(user);
    }

    return user;
  }

  async bookTimeSlot(
    timeSlotId: string,
    userId: string,
    bookingNotes?: string,
    sessionType?: 'virtual' | 'clinic'
  ): Promise<TimeSlot> {
    const timeSlot = await this.timeSlotRepository.findOne({
      where: { id: timeSlotId },
      relations: ['psychologist'],
    });

    if (!timeSlot) {
      throw new Error('Slot no encontrado');
    }

    if (!timeSlot.available) {
      throw new Error('Slot no disponible');
    }

    timeSlot.available = false;
    timeSlot.userId = userId;
    timeSlot.bookingNotes = bookingNotes;

    if (sessionType === 'virtual') {
      timeSlot.clinicSession = false;
    } else if (sessionType === 'clinic') {
      timeSlot.virtualSession = false;
    }

    return await this.timeSlotRepository.save(timeSlot);
  }
} 