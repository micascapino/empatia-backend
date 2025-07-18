import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { PsychologistRepository } from '../infrastructure/repositories/psychologist.repository';
import { BookTimeSlotRequestDto } from './dto/book-time-slot.request.dto';
import { BookTimeSlotResponseDto } from './dto/book-time-slot.response.dto';

@Injectable()
export class BookTimeSlotUseCase {
    private readonly logger = new Logger(BookTimeSlotUseCase.name);

    constructor(
        private readonly psychologistRepository: PsychologistRepository,
    ) { }

    async execute(request: BookTimeSlotRequestDto): Promise<BookTimeSlotResponseDto> {
        try {
            const timeSlot = await this.psychologistRepository.findTimeSlotById(request.timeSlotId);

            if (!timeSlot || !timeSlot.available) {
                throw new NotFoundException('Slot no disponible.');
            }

            if (request.sessionType === 'virtual' && !timeSlot.virtualSession) {
                throw new BadRequestException('Este horario no está disponible para sesiones virtuales');
            }

            if (request.sessionType === 'clinic' && !timeSlot.clinicSession) {
                throw new BadRequestException('Este horario no está disponible para sesiones presenciales');
            }

            const user = await this.psychologistRepository.findOrCreateUser({
                name: request.patientName,
                email: request.patientEmail,
                phone: request.patientPhone,
                notes: request.bookingNotes,
            });

            const bookedSlot = await this.psychologistRepository.bookTimeSlot(
                request.timeSlotId,
                user.id,
                request.bookingNotes,
                request.sessionType
            );

            const response: BookTimeSlotResponseDto = {
                message: `Sesión reservada exitosamente con ${bookedSlot.psychologist.name} para el ${bookedSlot.startDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las ${bookedSlot.startDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })}`,
            };

            return response;
        } catch (error) {
            this.logger.error(`Error al reservar slot - ID: ${request.timeSlotId}`, error);
            throw error;
        }
    }
} 