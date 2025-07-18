import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetPsychologistWithAvailabilityUseCase } from './get-psychologist-with-availability.usecase';
import { GetPsychologistWithAvailabilityRequestDto } from './dto/get-psychologist-with-availability.request.dto';
import { PsychologistWithAvailabilityResponseDto } from './dto/get-psychologist-with-availability.response.dto';

@ApiTags('psychologists')
@Controller('psychologists')
export class GetPsychologistWithAvailabilityController {
  constructor(
    private readonly getPsychologistWithAvailabilityUseCase: GetPsychologistWithAvailabilityUseCase,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un psicólogo específico con sus horarios disponibles' })
  @ApiParam({ name: 'id', description: 'ID del psicólogo' })
  @ApiResponse({ 
    status: 200, 
    description: 'Psicólogo obtenido exitosamente',
    type: PsychologistWithAvailabilityResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Psicólogo no encontrado' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async getPsychologistWithAvailability(@Param('id') id: string): Promise<PsychologistWithAvailabilityResponseDto> {
    try {
      const request: GetPsychologistWithAvailabilityRequestDto = { id };
      return await this.getPsychologistWithAvailabilityUseCase.execute(request);
    } catch (error) {
      if (error.message === 'Psicólogo no encontrado') {
        throw new HttpException(
          'Psicólogo no encontrado',
          HttpStatus.NOT_FOUND
        );
      }
      throw new HttpException(
        'Error al obtener psicólogo',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 