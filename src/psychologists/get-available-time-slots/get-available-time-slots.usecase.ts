import { Injectable, Logger } from '@nestjs/common';
import { PsychologistRepository } from '../infrastructure/repositories/psychologist.repository';
import { GetAvailableTimeSlotsRequestDto } from './dto/get-available-time-slots.request.dto';
import { GetAvailableTimeSlotsResponseDto, AvailableTimeSlotResponseDto } from './dto/get-available-time-slots.response.dto';

@Injectable()
export class GetAvailableTimeSlotsUseCase {
  private readonly logger = new Logger(GetAvailableTimeSlotsUseCase.name);

  constructor(
    private readonly psychologistRepository: PsychologistRepository,
  ) { }

  async execute(request: GetAvailableTimeSlotsRequestDto): Promise<GetAvailableTimeSlotsResponseDto> {
    try {

      const timeSlots = await this.psychologistRepository.findAvailableTimeSlotsInDateRange(
        request.startDate,
        request.endDate
      );

      const response: GetAvailableTimeSlotsResponseDto = {
        timeSlots: timeSlots.map(slot => ({
          id: slot.id,
          startDate: slot.startDate instanceof Date ? slot.startDate : new Date(slot.startDate),
          endDate: slot.endDate instanceof Date ? slot.endDate : new Date(slot.endDate),
          psychologistId: slot.psychologistId,
          psychologistName: slot.psychologist.name,
          psychologistSpecializations: slot.psychologist.specializations,
          pricePerSession: slot.psychologist.pricePerSession,
          virtualSession: slot.virtualSession,
          clinicSession: slot.clinicSession,
        })),
        total: timeSlots.length,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error al obtener turnos disponibles`, error);
      throw error;
    }
  }
} 