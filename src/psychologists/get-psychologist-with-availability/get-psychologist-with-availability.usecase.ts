import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
        throw new NotFoundException('Psychologist not found');
      }

      return PsychologistWithAvailabilityMapper.toResponseDto(psychologist);
    } catch (error) {
      this.logger.error(`Error getting psychologist with availability - ID: ${request.id}`, error);
      throw error;
    }
  }
} 