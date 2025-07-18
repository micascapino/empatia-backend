import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional, IsBoolean } from 'class-validator';

export class TimeSlotDto {
  @ApiProperty({ description: 'ID del horario' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Fecha y hora de inicio en UTC' })
  startDate: Date;

  @ApiProperty({ description: 'Fecha y hora de fin en UTC' })
  endDate: Date;

  @ApiProperty({ description: 'Si está disponible' })
  @IsBoolean()
  available: boolean;

  @ApiProperty({ description: 'ID del psicólogo' })
  @IsString()
  psychologistId: string;
}

export class PsychologistDto {
  @ApiProperty({ description: 'ID del psicólogo' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Nombre completo del psicólogo' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Especialidades del psicólogo' })
  @IsArray()
  @IsString({ each: true })
  specializations: string[];

  @ApiProperty({ description: 'Valoración del psicólogo' })
  @IsNumber()
  rating: number;

  @ApiProperty({ description: 'Años de experiencia' })
  @IsNumber()
  experience: number;

  @ApiProperty({ description: 'URL del avatar' })
  @IsString()
  avatar: string;

  @ApiProperty({ description: 'Biografía del psicólogo' })
  @IsString()
  bio: string;

  @ApiProperty({ description: 'Precio por sesión' })
  @IsNumber()
  pricePerSession: number;

  @ApiProperty({ description: 'Idiomas que habla' })
  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @ApiProperty({ description: 'Educación y certificaciones' })
  @IsArray()
  @IsString({ each: true })
  education: string[];
}

export class PsychologistWithAvailabilityDto extends PsychologistDto {
  @ApiProperty({ description: 'Horarios disponibles', type: [TimeSlotDto] })
  @IsArray()
  availability: TimeSlotDto[];
} 