import { Injectable, Logger } from '@nestjs/common';
import { PsychologistRepository } from '../infrastructure/repositories/psychologist.repository';
import { GetAllPsychologistsResponseDto } from './dto/get-all-psychologists.response.dto';

@Injectable()
export class GetAllPsychologistsUseCase {
  private readonly logger = new Logger(GetAllPsychologistsUseCase.name);

  constructor(
    private readonly psychologistRepository: PsychologistRepository,
  ) { }

  async execute(): Promise<GetAllPsychologistsResponseDto> {
    try {

      const psychologists = await this.psychologistRepository.findAll();

      return {
        psychologists: psychologists.map(psychologist => ({
          id: psychologist.id,
          name: psychologist.name,
          specializations: psychologist.specializations,
          rating: psychologist.rating,
          experience: psychologist.experience,
          avatar: psychologist.avatar,
          bio: psychologist.bio,
          pricePerSession: psychologist.pricePerSession,
          languages: psychologist.languages,
          education: psychologist.education,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          availableSlotsCount: (psychologist as any).availableSlotsCount || 0,
        })),
        total: psychologists.length,
      };
    } catch (error) {
      this.logger.error('Error getting psychologists:', error);
      throw new Error('Error getting psychologists');
    }
  }
} 