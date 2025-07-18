import { Controller, Post, Body, HttpCode, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { BookTimeSlotUseCase } from './book-time-slot.usecase';
import { BookTimeSlotRequestDto } from './dto/book-time-slot.request.dto';
import { BookTimeSlotResponseDto } from './dto/book-time-slot.response.dto';

@ApiTags('psychologists')
@Controller('psychologists')
export class BookTimeSlotController {
  constructor(
    private readonly bookTimeSlotUseCase: BookTimeSlotUseCase,
  ) { }

  @Post('slots/book')
  @HttpCode(201)
  @ApiOperation({ summary: 'Reservar un slot específico' })
  @ApiBody({ type: BookTimeSlotRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Slot reservado exitosamente',
    type: BookTimeSlotResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Slot no disponible o datos inválidos'
  })
  @ApiResponse({
    status: 404,
    description: 'Slot no encontrado'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor'
  })
  async bookTimeSlot(@Body() request: BookTimeSlotRequestDto): Promise<BookTimeSlotResponseDto> {
    try {
      return await this.bookTimeSlotUseCase.execute(request);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('El horario seleccionado no fue encontrado');
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException('Error interno al procesar la reserva');
    }
  }
} 