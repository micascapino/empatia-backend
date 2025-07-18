import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAllPsychologistsUseCase } from './get-all-psychologists.usecase';
import { GetAllPsychologistsResponseDto } from './dto/get-all-psychologists.response.dto';

@ApiTags('psychologists')
@Controller('psychologists')
export class GetAllPsychologistsController {
  constructor(
    private readonly getAllPsychologistsUseCase: GetAllPsychologistsUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los psicólogos disponibles' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de psicólogos obtenida exitosamente',
    type: GetAllPsychologistsResponseDto
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async getAllPsychologists(): Promise<GetAllPsychologistsResponseDto> {
    try {
      return await this.getAllPsychologistsUseCase.execute();
    } catch (error) {
      throw new HttpException(
        'Error al obtener psicólogos',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 