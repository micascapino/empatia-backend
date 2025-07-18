import { Psychologist, TimeSlot } from '../../../../src/entities';
import { PsychologistWithAvailabilityResponseDto, TimeSlotResponseDto } from '../dto/get-psychologist-with-availability.response.dto';

export class PsychologistWithAvailabilityMapper {
    static toResponseDto(psychologist: Psychologist): PsychologistWithAvailabilityResponseDto {
        const now = new Date();

        return {
            id: psychologist.id,
            name: psychologist.name,
            specializations: psychologist.specializations,
            avatar: psychologist.avatar,
            pricePerSession: psychologist.pricePerSession,
            timeSlots: psychologist.timeSlots
                ?.filter(slot => {
                    const slotStartDate = slot.startDate instanceof Date ? slot.startDate : new Date(slot.startDate);
                    return slotStartDate > now && slot.available;
                })
                .map(slot => this.mapTimeSlot(slot)) || [],
        };
    }

    private static mapTimeSlot(slot: TimeSlot): TimeSlotResponseDto {
        return {
            id: slot.id,
            startDate: slot.startDate instanceof Date ? slot.startDate : new Date(slot.startDate),
            endDate: slot.endDate instanceof Date ? slot.endDate : new Date(slot.endDate),
            available: slot.available,
            virtualSession: slot.virtualSession,
            clinicSession: slot.clinicSession,
        };
    }
} 