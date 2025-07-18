import { ApiProperty } from '@nestjs/swagger';

export class PsychologistResponseDto {
    @ApiProperty({
        description: 'ID único del psicólogo',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id: string;

    @ApiProperty({
        description: 'Nombre completo del psicólogo',
        example: 'Dra. María González'
    })
    name: string;

    @ApiProperty({
        description: 'Especialidades del psicólogo',
        type: [String],
        example: ['Ansiedad', 'Depresión', 'Estrés']
    })
    specializations: string[];

    @ApiProperty({
        description: 'Calificación promedio del psicólogo',
        example: 4.9
    })
    rating: number;

    @ApiProperty({
        description: 'Años de experiencia',
        example: 8
    })
    experience: number;

    @ApiProperty({
        description: 'URL del avatar del psicólogo',
        required: false,
        example: '/api/placeholder/120/120'
    })
    avatar?: string;

    @ApiProperty({
        description: 'Biografía del psicólogo',
        example: 'Especialista en terapia cognitivo-conductual con más de 8 años de experiencia.'
    })
    bio: string;

    @ApiProperty({
        description: 'Precio por sesión en pesos',
        example: 15000
    })
    pricePerSession: number;

    @ApiProperty({
        description: 'Idiomas que habla el psicólogo',
        type: [String],
        example: ['Español', 'Inglés']
    })
    languages: string[];

    @ApiProperty({
        description: 'Educación y certificaciones',
        type: [String],
        example: ['Psicología Clínica - Universidad de Barcelona', 'Máster en Terapia Cognitivo-Conductual']
    })
    education: string[];

    @ApiProperty({
        description: 'Cantidad de horarios disponibles a partir de hoy',
        example: 15
    })
    availableSlotsCount: number;
}

export class GetAllPsychologistsResponseDto {
    @ApiProperty({
        description: 'Lista de psicólogos disponibles',
        type: [PsychologistResponseDto]
    })
    psychologists: PsychologistResponseDto[];

    @ApiProperty({ description: 'Total de psicólogos encontrados' })
    total: number;
} 