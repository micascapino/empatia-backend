import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsEmail, IsEnum } from 'class-validator';

export class BookTimeSlotRequestDto {
  @ApiProperty({ 
    description: 'ID del slot a reservar',
    example: '13184c0e-7983-4f6b-a7a5-9f9aa3f46483'
  })
  @IsUUID()
  timeSlotId: string;

  @ApiProperty({ 
    description: 'Nombre completo del paciente',
    example: 'Juan Pérez'
  })
  @IsString()
  patientName: string;

  @ApiProperty({ 
    description: 'Email del paciente',
    example: 'juan.perez@email.com'
  })
  @IsEmail()
  patientEmail: string;

  @ApiProperty({ 
    description: 'Teléfono del paciente (opcional)',
    example: '+54 11 1234-5678',
    required: false
  })
  @IsOptional()
  @IsString()
  patientPhone?: string;

  @ApiProperty({ 
    description: 'Notas adicionales para la reserva (opcional)',
    example: 'Primera consulta, preferencia por sesiones matutinas',
    required: false
  })
  @IsOptional()
  @IsString()
  bookingNotes?: string;

  @ApiProperty({ 
    description: 'Modalidad de la sesión seleccionada',
    example: 'virtual',
    enum: ['virtual', 'clinic']
  })
  @IsEnum(['virtual', 'clinic'])
  sessionType: 'virtual' | 'clinic';
} 