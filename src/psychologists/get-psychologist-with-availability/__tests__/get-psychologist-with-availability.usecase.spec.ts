import { GetPsychologistWithAvailabilityUseCase } from '../get-psychologist-with-availability.usecase';
import { PsychologistRepository } from '../../infrastructure/repositories/psychologist.repository';
import { GetPsychologistWithAvailabilityRequestDto } from '../dto/get-psychologist-with-availability.request.dto';
import { Psychologist, TimeSlot } from '../../../entities';
import { NotFoundException } from '@nestjs/common';

describe('GetPsychologistWithAvailabilityUseCase', () => {
    let useCase: GetPsychologistWithAvailabilityUseCase;
    let mockPsychologistRepository: jest.Mocked<PsychologistRepository>;

      const mockTimeSlots: Partial<TimeSlot>[] = [
    {
      id: 'slot-1',
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 25 * 60 * 60 * 1000),
      available: true,
      virtualSession: true,
      clinicSession: true
    },
    {
      id: 'slot-2',
      startDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 49 * 60 * 60 * 1000),
      available: true,
      virtualSession: true,
      clinicSession: false
    },
    {
      id: 'slot-3',
      startDate: new Date(Date.now() + 72 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 73 * 60 * 60 * 1000),
      available: false,
      virtualSession: true,
      clinicSession: true
    }
  ];

    const mockPsychologist: Partial<Psychologist> = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Dr. María González',
        specializations: ['Ansiedad', 'Depresión'],
        avatar: 'https://example.com/avatar.jpg',
        pricePerSession: 5000,
        timeSlots: mockTimeSlots as TimeSlot[]
    };

    const mockRequest: GetPsychologistWithAvailabilityRequestDto = {
        id: '123e4567-e89b-12d3-a456-426614174000'
    };

    beforeEach(() => {
        const mockRepository = {
            findByIdWithTimeSlots: jest.fn()
        };

        useCase = new GetPsychologistWithAvailabilityUseCase(mockRepository as any);
        mockPsychologistRepository = mockRepository as any;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('execute', () => {
        it('should get psychologist with availability successfully', async () => {
            mockPsychologistRepository.findByIdWithTimeSlots.mockResolvedValue(mockPsychologist as Psychologist);

            const result = await useCase.execute(mockRequest);

            expect(mockPsychologistRepository.findByIdWithTimeSlots).toHaveBeenCalledWith(mockRequest.id);
            expect(result.timeSlots).toBeDefined();
        });

        it('should throw NotFoundException when psychologist is not found', async () => {
            mockPsychologistRepository.findByIdWithTimeSlots.mockResolvedValue(null);

            await expect(useCase.execute(mockRequest)).rejects.toThrow(NotFoundException);
            await expect(useCase.execute(mockRequest)).rejects.toThrow('Psychologist not found');
            expect(mockPsychologistRepository.findByIdWithTimeSlots).toHaveBeenCalledWith(mockRequest.id);
        });

        it('should handle psychologist with no time slots', async () => {
            const psychologistWithoutSlots = { ...mockPsychologist, timeSlots: [] };
            mockPsychologistRepository.findByIdWithTimeSlots.mockResolvedValue(psychologistWithoutSlots as Psychologist);

            const result = await useCase.execute(mockRequest);

            expect(result.timeSlots).toEqual([]);
            expect(result.timeSlots).toHaveLength(0);
        });

        it('should handle psychologist with null time slots', async () => {
            const psychologistWithNullSlots = { ...mockPsychologist, timeSlots: null };
            mockPsychologistRepository.findByIdWithTimeSlots.mockResolvedValue(psychologistWithNullSlots as Psychologist);

            const result = await useCase.execute(mockRequest);

            expect(result.timeSlots).toEqual([]);
            expect(result.timeSlots).toHaveLength(0);
        });

        it('should handle psychologist with undefined time slots', async () => {
            const psychologistWithUndefinedSlots = { ...mockPsychologist, timeSlots: undefined };
            mockPsychologistRepository.findByIdWithTimeSlots.mockResolvedValue(psychologistWithUndefinedSlots as Psychologist);

            const result = await useCase.execute(mockRequest);

            expect(result.timeSlots).toEqual([]);
            expect(result.timeSlots).toHaveLength(0);
        });

        it('should handle repository errors', async () => {
            const error = new Error('Database connection failed');
            mockPsychologistRepository.findByIdWithTimeSlots.mockRejectedValue(error);

            await expect(useCase.execute(mockRequest)).rejects.toThrow('Database connection failed');
        });
    });
}); 