import { PsychologistWithAvailabilityMapper } from '../mappers/psychologist-with-availability.mapper';
import { Psychologist, TimeSlot } from '../../../entities';
import { PsychologistWithAvailabilityResponseDto } from '../dto/get-psychologist-with-availability.response.dto';

describe('PsychologistWithAvailabilityMapper', () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const mockTimeSlots: Partial<TimeSlot>[] = [
        {
            id: 'past-slot-1',
            startDate: oneHourAgo,
            endDate: new Date(oneHourAgo.getTime() + 60 * 60 * 1000),
            available: true,
            virtualSession: true,
            clinicSession: true
        },
        {
            id: 'future-slot-1',
            startDate: oneHourFromNow,
            endDate: new Date(oneHourFromNow.getTime() + 60 * 60 * 1000),
            available: true,
            virtualSession: true,
            clinicSession: true
        },
        {
            id: 'future-slot-2',
            startDate: twoHoursFromNow,
            endDate: new Date(twoHoursFromNow.getTime() + 60 * 60 * 1000),
            available: true,
            virtualSession: true,
            clinicSession: false
        },
        {
            id: 'future-slot-3',
            startDate: oneDayFromNow,
            endDate: new Date(oneDayFromNow.getTime() + 60 * 60 * 1000),
            available: false,
            virtualSession: true,
            clinicSession: true
        },
        {
            id: 'past-slot-2',
            startDate: new Date(now.getTime() - 2 * 60 * 60 * 1000),
            endDate: new Date(now.getTime() - 60 * 60 * 1000),
            available: true,
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

    describe('toResponseDto', () => {
        it('should filter out past time slots and unavailable slots', () => {
            const result = PsychologistWithAvailabilityMapper.toResponseDto(mockPsychologist as Psychologist);

            expect(result.id).toBe(mockPsychologist.id);
            expect(result.name).toBe(mockPsychologist.name);
            expect(result.specializations).toEqual(mockPsychologist.specializations);
            expect(result.avatar).toBe(mockPsychologist.avatar);
            expect(result.pricePerSession).toBe(mockPsychologist.pricePerSession);

            expect(result.timeSlots).toHaveLength(2);

            const slotIds = result.timeSlots.map(slot => slot.id);
            expect(slotIds).toContain('future-slot-1');
            expect(slotIds).toContain('future-slot-2');
            expect(slotIds).not.toContain('past-slot-1');
            expect(slotIds).not.toContain('past-slot-2');
            expect(slotIds).not.toContain('future-slot-3');
        });

        it('should handle psychologist with no time slots', () => {
            const psychologistWithoutSlots = { ...mockPsychologist, timeSlots: [] };
            const result = PsychologistWithAvailabilityMapper.toResponseDto(psychologistWithoutSlots as Psychologist);

            expect(result.timeSlots).toEqual([]);
            expect(result.timeSlots).toHaveLength(0);
        });

        it('should handle psychologist with null time slots', () => {
            const psychologistWithNullSlots = { ...mockPsychologist, timeSlots: null };
            const result = PsychologistWithAvailabilityMapper.toResponseDto(psychologistWithNullSlots as Psychologist);

            expect(result.timeSlots).toEqual([]);
            expect(result.timeSlots).toHaveLength(0);
        });

        it('should handle psychologist with undefined time slots', () => {
            const psychologistWithUndefinedSlots = { ...mockPsychologist, timeSlots: undefined };
            const result = PsychologistWithAvailabilityMapper.toResponseDto(psychologistWithUndefinedSlots as Psychologist);

            expect(result.timeSlots).toEqual([]);
            expect(result.timeSlots).toHaveLength(0);
        });

        it('should filter out slots that are exactly at current time', () => {
            const slotsAtCurrentTime = [
                {
                    id: 'current-slot',
                    startDate: now,
                    endDate: new Date(now.getTime() + 60 * 60 * 1000),
                    available: true,
                    virtualSession: true,
                    clinicSession: true
                }
            ];

            const psychologistWithCurrentSlot = { ...mockPsychologist, timeSlots: slotsAtCurrentTime as TimeSlot[] };
            const result = PsychologistWithAvailabilityMapper.toResponseDto(psychologistWithCurrentSlot as Psychologist);

            expect(result.timeSlots).toHaveLength(0);
        });

        it('should handle string dates and convert them to Date objects', () => {
            const slotsWithStringDates = [
                {
                    id: 'string-date-slot',
                    startDate: oneHourFromNow.toISOString(),
                    endDate: new Date(oneHourFromNow.getTime() + 60 * 60 * 1000).toISOString(),
                    available: true,
                    virtualSession: true,
                    clinicSession: true
                }
            ];

            const psychologistWithStringDates = { ...mockPsychologist, timeSlots: slotsWithStringDates as unknown as TimeSlot[] };
            const result = PsychologistWithAvailabilityMapper.toResponseDto(psychologistWithStringDates as Psychologist);

            expect(result.timeSlots).toHaveLength(1);
            expect(result.timeSlots[0].startDate).toBeInstanceOf(Date);
            expect(result.timeSlots[0].endDate).toBeInstanceOf(Date);
        });

        it('should filter out unavailable slots even if they are in the future', () => {
            const futureUnavailableSlots = [
                {
                    id: 'future-unavailable',
                    startDate: oneDayFromNow,
                    endDate: new Date(oneDayFromNow.getTime() + 60 * 60 * 1000),
                    available: false,
                    virtualSession: true,
                    clinicSession: true
                }
            ];

            const psychologistWithFutureUnavailable = { ...mockPsychologist, timeSlots: futureUnavailableSlots as TimeSlot[] };
            const result = PsychologistWithAvailabilityMapper.toResponseDto(psychologistWithFutureUnavailable as Psychologist);

            expect(result.timeSlots).toHaveLength(0);
        });

        it('should preserve all slot properties in the mapped result', () => {
            const singleSlot = [
                {
                    id: 'test-slot',
                    startDate: oneHourFromNow,
                    endDate: new Date(oneHourFromNow.getTime() + 60 * 60 * 1000),
                    available: true,
                    virtualSession: true,
                    clinicSession: false
                }
            ];

            const psychologistWithSingleSlot = { ...mockPsychologist, timeSlots: singleSlot as TimeSlot[] };
            const result = PsychologistWithAvailabilityMapper.toResponseDto(psychologistWithSingleSlot as Psychologist);

            expect(result.timeSlots).toHaveLength(1);
            const slot = result.timeSlots[0];
            expect(slot.id).toBe('test-slot');
            expect(slot.startDate).toEqual(oneHourFromNow);
            expect(slot.endDate).toEqual(new Date(oneHourFromNow.getTime() + 60 * 60 * 1000));
            expect(slot.available).toBe(true);
            expect(slot.virtualSession).toBe(true);
            expect(slot.clinicSession).toBe(false);
        });

        it('should handle edge case with slots very close to current time', () => {
            const oneMinuteFromNow = new Date(now.getTime() + 60 * 1000);
            const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);

            const edgeCaseSlots = [
                {
                    id: 'one-minute-future',
                    startDate: oneMinuteFromNow,
                    endDate: new Date(oneMinuteFromNow.getTime() + 60 * 60 * 1000),
                    available: true,
                    virtualSession: true,
                    clinicSession: true
                },
                {
                    id: 'one-minute-past',
                    startDate: oneMinuteAgo,
                    endDate: new Date(oneMinuteAgo.getTime() + 60 * 60 * 1000),
                    available: true,
                    virtualSession: true,
                    clinicSession: true
                }
            ];

            const psychologistWithEdgeCases = { ...mockPsychologist, timeSlots: edgeCaseSlots as TimeSlot[] };
            const result = PsychologistWithAvailabilityMapper.toResponseDto(psychologistWithEdgeCases as Psychologist);

            expect(result.timeSlots).toHaveLength(1);
            expect(result.timeSlots[0].id).toBe('one-minute-future');
        });
    });
}); 