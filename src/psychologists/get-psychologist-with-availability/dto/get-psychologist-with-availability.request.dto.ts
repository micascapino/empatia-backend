import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class GetPsychologistWithAvailabilityRequestDto {
  @ApiProperty({ 
    description: 'ID único del psicólogo',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
} 