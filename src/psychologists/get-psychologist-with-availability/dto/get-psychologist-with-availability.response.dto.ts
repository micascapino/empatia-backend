import { ApiProperty } from '@nestjs/swagger';

export class TimeSlotResponseDto {
  @ApiProperty({ description: 'ID único del horario', example: '123e4567-e89b-12d3-a456-426614174001' })
  id: string;

  @ApiProperty({ description: 'Fecha y hora de inicio en UTC', example: '2024-01-20T09:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ description: 'Fecha y hora de fin en UTC', example: '2024-01-20T10:00:00.000Z' })
  endDate: Date;

  @ApiProperty({ description: 'Indica si el horario está disponible', example: true })
  available: boolean;

  @ApiProperty({ description: 'Indica si la sesión está disponible de forma virtual', example: true })
  virtualSession: boolean;

  @ApiProperty({ description: 'Indica si la sesión está disponible de forma presencial', example: true })
  clinicSession: boolean;

}

export class PsychologistWithAvailabilityResponseDto {
  @ApiProperty({ description: 'ID único del psicólogo' })
  id: string;

  @ApiProperty({ description: 'Nombre completo del psicólogo' })
  name: string;

  @ApiProperty({ description: 'Especialidades del psicólogo', type: [String] })
  specializations: string[];

  @ApiProperty({ description: 'URL del avatar del psicólogo', required: false })
  avatar?: string;

  @ApiProperty({ description: 'Precio por sesión en pesos' })
  pricePerSession: number;

  @ApiProperty({
    description: 'Horarios disponibles del psicólogo',
    type: [TimeSlotResponseDto]
  })
  timeSlots: TimeSlotResponseDto[];
} 