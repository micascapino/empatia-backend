import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsArray, Matches, IsBoolean } from 'class-validator';

export class GetAvailableTimeSlotsRequestDto {
  @ApiProperty({ 
    description: 'Fecha de inicio (formato YYYY-MM-DD)',
    example: '2024-01-15'
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'startDate debe tener formato YYYY-MM-DD' })
  startDate: string;

  @ApiProperty({ 
    description: 'Fecha de fin (formato YYYY-MM-DD)',
    example: '2024-01-21'
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'endDate debe tener formato YYYY-MM-DD' })
  endDate: string;
} 