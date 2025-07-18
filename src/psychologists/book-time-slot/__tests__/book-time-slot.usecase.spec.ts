import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BookTimeSlotUseCase } from '../book-time-slot.usecase';
import { PsychologistRepository } from '../../infrastructure/repositories/psychologist.repository';
import { BookTimeSlotRequestDto } from '../dto/book-time-slot.request.dto';
import { TimeSlot, User } from '../../../entities';

describe('BookTimeSlotUseCase', () => {
  let useCase: BookTimeSlotUseCase;
  let mockPsychologistRepository: jest.Mocked<PsychologistRepository>;

  const mockTimeSlot: Partial<TimeSlot> = {
    id: '13184c0e-7983-4f6b-a7a5-9f9aa3f46483',
    psychologistId: 'psychologist-id',
    available: true,
    virtualSession: true,
    clinicSession: true,
    startDate: new Date('2024-01-15T10:00:00Z'),
    endDate: new Date('2024-01-15T11:00:00Z'),
    createdAt: new Date(),
    updatedAt: new Date(),
    psychologist: {
      id: 'psychologist-id',
      name: 'Dr. María González',
      email: 'maria.gonzalez@email.com',
      phone: '+54 11 9876-5432',
      specialties: [],
      timeSlots: []
    } as any
  };

  const mockUser: Partial<User> = {
    id: 'user-id',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+54 11 1234-5678',
    birthDate: new Date('1990-01-01'),
    notes: null,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    timeSlots: []
  };

  const mockRequest: BookTimeSlotRequestDto = {
    timeSlotId: '13184c0e-7983-4f6b-a7a5-9f9aa3f46483',
    patientName: 'Juan Pérez',
    patientEmail: 'juan.perez@email.com',
    patientPhone: '+54 11 1234-5678',
    bookingNotes: 'Primera consulta',
    sessionType: 'virtual'
  };

  beforeEach(() => {
    const mockRepository = {
      findTimeSlotById: jest.fn(),
      findOrCreateUser: jest.fn(),
      bookTimeSlot: jest.fn()
    };

    useCase = new BookTimeSlotUseCase(mockRepository as any);
    mockPsychologistRepository = mockRepository as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should book a time slot successfully for virtual session', async () => {
      mockPsychologistRepository.findTimeSlotById.mockResolvedValue(mockTimeSlot as TimeSlot);
      mockPsychologistRepository.findOrCreateUser.mockResolvedValue(mockUser as User);
      mockPsychologistRepository.bookTimeSlot.mockResolvedValue({
        ...mockTimeSlot,
        userId: mockUser.id,
        bookingNotes: mockRequest.bookingNotes
      } as TimeSlot);

      const result = await useCase.execute(mockRequest);

      expect(mockPsychologistRepository.findTimeSlotById).toHaveBeenCalledWith(mockRequest.timeSlotId);
      expect(mockPsychologistRepository.findOrCreateUser).toHaveBeenCalledWith({
        name: mockRequest.patientName,
        email: mockRequest.patientEmail,
        phone: mockRequest.patientPhone,
        notes: mockRequest.bookingNotes
      });
      expect(mockPsychologistRepository.bookTimeSlot).toHaveBeenCalledWith(
        mockRequest.timeSlotId,
        mockUser.id,
        mockRequest.bookingNotes,
        mockRequest.sessionType
      );
      expect(result.message).toContain('Sesión reservada exitosamente');
      expect(result.message).toContain('Dr. María González');
    });

    it('should book a time slot successfully for clinic session', async () => {
      const clinicRequest = { ...mockRequest, sessionType: 'clinic' as const };
      
      mockPsychologistRepository.findTimeSlotById.mockResolvedValue(mockTimeSlot as TimeSlot);
      mockPsychologistRepository.findOrCreateUser.mockResolvedValue(mockUser as User);
      mockPsychologistRepository.bookTimeSlot.mockResolvedValue({
        ...mockTimeSlot,
        userId: mockUser.id,
        bookingNotes: clinicRequest.bookingNotes
      } as TimeSlot);

      const result = await useCase.execute(clinicRequest);

      expect(mockPsychologistRepository.bookTimeSlot).toHaveBeenCalledWith(
        clinicRequest.timeSlotId,
        mockUser.id,
        clinicRequest.bookingNotes,
        clinicRequest.sessionType
      );
      expect(result.message).toContain('Sesión reservada exitosamente');
    });

    it('should throw NotFoundException when time slot does not exist', async () => {
      mockPsychologistRepository.findTimeSlotById.mockResolvedValue(null);

      await expect(useCase.execute(mockRequest)).rejects.toThrow(NotFoundException);
      expect(mockPsychologistRepository.findTimeSlotById).toHaveBeenCalledWith(mockRequest.timeSlotId);
    });

    it('should throw NotFoundException when time slot is not available', async () => {
      const unavailableSlot = { ...mockTimeSlot, available: false } as TimeSlot;
      mockPsychologistRepository.findTimeSlotById.mockResolvedValue(unavailableSlot);

      await expect(useCase.execute(mockRequest)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when virtual session is requested but not available', async () => {
      const virtualOnlySlot = { ...mockTimeSlot, virtualSession: false } as TimeSlot;
      mockPsychologistRepository.findTimeSlotById.mockResolvedValue(virtualOnlySlot);

      await expect(useCase.execute(mockRequest)).rejects.toThrow(BadRequestException);
      expect(mockPsychologistRepository.findTimeSlotById).toHaveBeenCalledWith(mockRequest.timeSlotId);
    });

    it('should throw BadRequestException when clinic session is requested but not available', async () => {
      const clinicRequest = { ...mockRequest, sessionType: 'clinic' as const };
      const clinicOnlySlot = { ...mockTimeSlot, clinicSession: false } as TimeSlot;
      mockPsychologistRepository.findTimeSlotById.mockResolvedValue(clinicOnlySlot);

      await expect(useCase.execute(clinicRequest)).rejects.toThrow(BadRequestException);
    });

    it('should handle booking without patient phone', async () => {
      const requestWithoutPhone = { ...mockRequest };
      delete requestWithoutPhone.patientPhone;

      mockPsychologistRepository.findTimeSlotById.mockResolvedValue(mockTimeSlot as TimeSlot);
      mockPsychologistRepository.findOrCreateUser.mockResolvedValue(mockUser as User);
      mockPsychologistRepository.bookTimeSlot.mockResolvedValue({
        ...mockTimeSlot,
        userId: mockUser.id,
        bookingNotes: requestWithoutPhone.bookingNotes
      } as TimeSlot);

      const result = await useCase.execute(requestWithoutPhone);

      expect(mockPsychologistRepository.findOrCreateUser).toHaveBeenCalledWith({
        name: requestWithoutPhone.patientName,
        email: requestWithoutPhone.patientEmail,
        phone: undefined,
        notes: requestWithoutPhone.bookingNotes
      });
      expect(result.message).toContain('Sesión reservada exitosamente');
    });

    it('should handle booking without additional notes', async () => {
      const requestWithoutNotes = { ...mockRequest };
      delete requestWithoutNotes.bookingNotes;

      mockPsychologistRepository.findTimeSlotById.mockResolvedValue(mockTimeSlot as TimeSlot);
      mockPsychologistRepository.findOrCreateUser.mockResolvedValue(mockUser as User);
      mockPsychologistRepository.bookTimeSlot.mockResolvedValue({
        ...mockTimeSlot,
        userId: mockUser.id,
        bookingNotes: undefined
      } as TimeSlot);

      const result = await useCase.execute(requestWithoutNotes);

      expect(mockPsychologistRepository.findOrCreateUser).toHaveBeenCalledWith({
        name: requestWithoutNotes.patientName,
        email: requestWithoutNotes.patientEmail,
        phone: requestWithoutNotes.patientPhone,
        notes: undefined
      });
      expect(result.message).toContain('Sesión reservada exitosamente');
    });
  });
}); 