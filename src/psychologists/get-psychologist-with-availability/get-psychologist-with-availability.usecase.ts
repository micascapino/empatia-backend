import { Injectable, Logger } from '@nestjs/common';
import { PsychologistRepository } from '../infrastructure/repositories/psychologist.repository';
import { GetPsychologistWithAvailabilityRequestDto } from './dto/get-psychologist-with-availability.request.dto';
import { PsychologistWithAvailabilityResponseDto } from './dto/get-psychologist-with-availability.response.dto';
import { PsychologistWithAvailabilityMapper } from './mappers/psychologist-with-availability.mapper';

@Injectable()
export class GetPsychologistWithAvailabilityUseCase {
  private readonly logger = new Logger(GetPsychologistWithAvailabilityUseCase.name);

  constructor(
    private readonly psychologistRepository: PsychologistRepository,
  ) { }

  async execute(request: GetPsychologistWithAvailabilityRequestDto): Promise<PsychologistWithAvailabilityResponseDto> {
    try {

      const psychologist = await this.psychologistRepository.findByIdWithTimeSlots(request.id);

      if (!psychologist) {
        this.logger.warn(`Psicólogo no encontrado - ID: ${request.id}`);
        throw new Error('Psicólogo no encontrado');
      }

      return PsychologistWithAvailabilityMapper.toResponseDto(psychologist);
    } catch (error) {
      this.logger.error(`Error al obtener psicólogo con disponibilidad - ID: ${request.id}`, error);
      throw error;
    }
  }
} 