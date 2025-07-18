import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GetAvailableTimeSlotsUseCase } from './get-available-time-slots.usecase';
import { GetAvailableTimeSlotsRequestDto } from './dto/get-available-time-slots.request.dto';
import { GetAvailableTimeSlotsResponseDto } from './dto/get-available-time-slots.response.dto';

@ApiTags('psychologists')
@Controller('psychologists')
export class GetAvailableTimeSlotsController {
  constructor(
    private readonly getAvailableTimeSlotsUseCase: GetAvailableTimeSlotsUseCase,
  ) {}

  @Get('slots/available')
  @ApiOperation({ summary: 'Obtener turnos disponibles entre fechas con filtros opcionales' })
  @ApiQuery({ name: 'startDate', description: 'Fecha de inicio (YYYY-MM-DD)', example: '2024-01-15' })
  @ApiQuery({ name: 'endDate', description: 'Fecha de fin (YYYY-MM-DD)', example: '2024-01-21' })
  @ApiQuery({ name: 'psychologistName', description: 'Nombre del psicólogo (opcional)', required: false })
  @ApiQuery({ name: 'specializations', description: 'Especialidades (opcional, separadas por coma)', required: false })
  @ApiResponse({ 
    status: 200, 
    description: 'Turnos disponibles obtenidos exitosamente',
    type: GetAvailableTimeSlotsResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Parámetros inválidos' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async getAvailableTimeSlots(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<GetAvailableTimeSlotsResponseDto> {
    try {
      const request: GetAvailableTimeSlotsRequestDto = {
        startDate,
        endDate,
      };

      return await this.getAvailableTimeSlotsUseCase.execute(request);
    } catch (error) {
      if (error.message.includes('invalid')) {
        throw new HttpException(
          'Parámetros de fecha inválidos',
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        'Error al obtener turnos disponibles',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 