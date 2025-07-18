import { BookTimeSlotController } from '../book-time-slot.controller';
import { BookTimeSlotUseCase } from '../book-time-slot.usecase';
import { BookTimeSlotRequestDto } from '../dto/book-time-slot.request.dto';
import { BookTimeSlotResponseDto } from '../dto/book-time-slot.response.dto';
import { NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';

describe('BookTimeSlotController', () => {
  let controller: BookTimeSlotController;
  let mockBookTimeSlotUseCase: jest.Mocked<BookTimeSlotUseCase>;

  const mockRequest: BookTimeSlotRequestDto = {
    timeSlotId: '13184c0e-7983-4f6b-a7a5-9f9aa3f46483',
    patientName: 'Juan Pérez',
    patientEmail: 'juan.perez@email.com',
    patientPhone: '+54 11 1234-5678',
    bookingNotes: 'Primera consulta',
    sessionType: 'virtual'
  };

  const mockResponse: BookTimeSlotResponseDto = {
    message: 'Sesión reservada exitosamente con Dr. María González para el lunes, 15 de enero de 2024 a las 10:00'
  };

  beforeEach(() => {
    const mockUseCase = {
      execute: jest.fn()
    };

    controller = new BookTimeSlotController(mockUseCase as any);
    mockBookTimeSlotUseCase = mockUseCase as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('bookTimeSlot', () => {
    it('should book a time slot successfully', async () => {
      mockBookTimeSlotUseCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.bookTimeSlot(mockRequest);

      expect(mockBookTimeSlotUseCase.execute).toHaveBeenCalledWith(mockRequest);
      expect(result).toEqual(mockResponse);
    });

    it('should handle NotFoundException and throw custom message', async () => {
      mockBookTimeSlotUseCase.execute.mockRejectedValue(new NotFoundException('Slot no encontrado'));

      await expect(controller.bookTimeSlot(mockRequest)).rejects.toThrow(NotFoundException);
      await expect(controller.bookTimeSlot(mockRequest)).rejects.toThrow('El horario seleccionado no fue encontrado');
    });

    it('should handle BadRequestException and propagate the message', async () => {
      const errorMessage = 'Este horario no está disponible para sesiones virtuales';
      mockBookTimeSlotUseCase.execute.mockRejectedValue(new BadRequestException(errorMessage));

      await expect(controller.bookTimeSlot(mockRequest)).rejects.toThrow(BadRequestException);
      await expect(controller.bookTimeSlot(mockRequest)).rejects.toThrow(errorMessage);
    });

    it('should handle generic errors and throw InternalServerErrorException', async () => {
      mockBookTimeSlotUseCase.execute.mockRejectedValue(new Error('Error de base de datos'));

      await expect(controller.bookTimeSlot(mockRequest)).rejects.toThrow(InternalServerErrorException);
      await expect(controller.bookTimeSlot(mockRequest)).rejects.toThrow('Error interno al procesar la reserva');
    });

    it('should handle booking for clinic session', async () => {
      const clinicRequest = { ...mockRequest, sessionType: 'clinic' as const };
      mockBookTimeSlotUseCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.bookTimeSlot(clinicRequest);

      expect(mockBookTimeSlotUseCase.execute).toHaveBeenCalledWith(clinicRequest);
      expect(result).toEqual(mockResponse);
    });

    it('should handle booking without patient phone', async () => {
      const requestWithoutPhone = { ...mockRequest };
      delete requestWithoutPhone.patientPhone;
      mockBookTimeSlotUseCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.bookTimeSlot(requestWithoutPhone);

      expect(mockBookTimeSlotUseCase.execute).toHaveBeenCalledWith(requestWithoutPhone);
      expect(result).toEqual(mockResponse);
    });

    it('should handle booking without additional notes', async () => {
      const requestWithoutNotes = { ...mockRequest };
      delete requestWithoutNotes.bookingNotes;
      mockBookTimeSlotUseCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.bookTimeSlot(requestWithoutNotes);

      expect(mockBookTimeSlotUseCase.execute).toHaveBeenCalledWith(requestWithoutNotes);
      expect(result).toEqual(mockResponse);
    });
  });
}); 