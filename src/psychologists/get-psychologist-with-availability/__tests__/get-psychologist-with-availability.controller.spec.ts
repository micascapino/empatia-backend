import { GetPsychologistWithAvailabilityController } from '../get-psychologist-with-availability.controller';
import { GetPsychologistWithAvailabilityUseCase } from '../get-psychologist-with-availability.usecase';
import { PsychologistWithAvailabilityResponseDto } from '../dto/get-psychologist-with-availability.response.dto';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

describe('GetPsychologistWithAvailabilityController', () => {
  let controller: GetPsychologistWithAvailabilityController;
  let mockGetPsychologistWithAvailabilityUseCase: jest.Mocked<GetPsychologistWithAvailabilityUseCase>;

  const mockResponse: PsychologistWithAvailabilityResponseDto = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Dr. María González',
    specializations: ['Ansiedad', 'Depresión'],
    avatar: 'https://example.com/avatar.jpg',
    pricePerSession: 5000,
    timeSlots: [
      {
        id: 'slot-1',
        startDate: new Date('2024-01-20T09:00:00.000Z'),
        endDate: new Date('2024-01-20T10:00:00.000Z'),
        available: true,
        virtualSession: true,
        clinicSession: true
      }
    ]
  };

  beforeEach(() => {
    const mockUseCase = {
      execute: jest.fn()
    };

    controller = new GetPsychologistWithAvailabilityController(mockUseCase as any);
    mockGetPsychologistWithAvailabilityUseCase = mockUseCase as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPsychologistWithAvailability', () => {
    it('should get psychologist with availability successfully', async () => {
      const psychologistId = '123e4567-e89b-12d3-a456-426614174000';
      mockGetPsychologistWithAvailabilityUseCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.getPsychologistWithAvailability(psychologistId);

      expect(mockGetPsychologistWithAvailabilityUseCase.execute).toHaveBeenCalledWith({ id: psychologistId });
      expect(result).toEqual(mockResponse);
    });

    it('should handle psychologist not found error', async () => {
      const psychologistId = '123e4567-e89b-12d3-a456-426614174000';
      const error = new NotFoundException('Psychologist not found');
      mockGetPsychologistWithAvailabilityUseCase.execute.mockRejectedValue(error);

      await expect(controller.getPsychologistWithAvailability(psychologistId)).rejects.toThrow(HttpException);
      await expect(controller.getPsychologistWithAvailability(psychologistId)).rejects.toThrow('Psychologist not found');
      
      try {
        await controller.getPsychologistWithAvailability(psychologistId);
      } catch (error) {
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });

    it('should handle generic errors with internal server error', async () => {
      const psychologistId = '123e4567-e89b-12d3-a456-426614174000';
      const error = new Error('Database connection error');
      mockGetPsychologistWithAvailabilityUseCase.execute.mockRejectedValue(error);

      await expect(controller.getPsychologistWithAvailability(psychologistId)).rejects.toThrow(HttpException);
      await expect(controller.getPsychologistWithAvailability(psychologistId)).rejects.toThrow('Error getting psychologist');
      
      try {
        await controller.getPsychologistWithAvailability(psychologistId);
      } catch (error) {
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });

    it('should handle empty psychologist ID', async () => {
      const psychologistId = '';
      const error = new Error('Psicólogo no encontrado');
      mockGetPsychologistWithAvailabilityUseCase.execute.mockRejectedValue(error);

      await expect(controller.getPsychologistWithAvailability(psychologistId)).rejects.toThrow(HttpException);
    });

    it('should handle invalid UUID format', async () => {
      const psychologistId = 'invalid-uuid';
      const error = new Error('Psicólogo no encontrado');
      mockGetPsychologistWithAvailabilityUseCase.execute.mockRejectedValue(error);

      await expect(controller.getPsychologistWithAvailability(psychologistId)).rejects.toThrow(HttpException);
    });

    it('should handle psychologist with no time slots', async () => {
      const psychologistId = '123e4567-e89b-12d3-a456-426614174000';
      const responseWithNoSlots = { ...mockResponse, timeSlots: [] };
      mockGetPsychologistWithAvailabilityUseCase.execute.mockResolvedValue(responseWithNoSlots);

      const result = await controller.getPsychologistWithAvailability(psychologistId);

      expect(result.timeSlots).toEqual([]);
      expect(result.timeSlots).toHaveLength(0);
    });
  });
}); 