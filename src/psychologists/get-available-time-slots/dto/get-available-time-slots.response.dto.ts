import { ApiProperty } from '@nestjs/swagger';

export class AvailableTimeSlotResponseDto {
  @ApiProperty({ description: 'ID único del horario' })
  id: string;

  @ApiProperty({ description: 'Fecha y hora de inicio en UTC', example: '2024-01-20T09:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ description: 'Fecha y hora de fin en UTC', example: '2024-01-20T10:00:00.000Z' })
  endDate: Date;

  @ApiProperty({ description: 'ID del psicólogo' })
  psychologistId: string;

  @ApiProperty({ description: 'Nombre del psicólogo' })
  psychologistName: string;

  @ApiProperty({ description: 'Especialidades del psicólogo', type: [String] })
  psychologistSpecializations: string[];

  @ApiProperty({ description: 'Precio por sesión' })
  pricePerSession: number;

  @ApiProperty({ description: 'Indica si la sesión está disponible de forma virtual', example: true })
  virtualSession: boolean;

  @ApiProperty({ description: 'Indica si la sesión está disponible de forma presencial', example: true })
  clinicSession: boolean;

}

export class GetAvailableTimeSlotsResponseDto {
  @ApiProperty({
    description: 'Horarios disponibles',
    type: [AvailableTimeSlotResponseDto]
  })
  timeSlots: AvailableTimeSlotResponseDto[];

  @ApiProperty({ description: 'Total de horarios disponibles' })
  total: number;
} 