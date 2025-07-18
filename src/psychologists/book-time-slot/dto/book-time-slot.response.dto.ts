import { ApiProperty } from '@nestjs/swagger';

export class BookTimeSlotResponseDto {
  @ApiProperty({ description: 'Mensaje de confirmación de la reserva' })
  message: string;
} 