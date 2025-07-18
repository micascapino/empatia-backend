import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Psychologist, TimeSlot, User } from '../../src/entities';

import { PsychologistRepository } from './infrastructure/repositories/psychologist.repository';

import { GetAllPsychologistsUseCase } from './get-all-psychologists/get-all-psychologists.usecase';
import { GetAllPsychologistsController } from './get-all-psychologists/get-all-psychologists.controller';

import { GetPsychologistWithAvailabilityUseCase } from './get-psychologist-with-availability/get-psychologist-with-availability.usecase';
import { GetPsychologistWithAvailabilityController } from './get-psychologist-with-availability/get-psychologist-with-availability.controller';

import { GetAvailableTimeSlotsUseCase } from './get-available-time-slots/get-available-time-slots.usecase';
import { GetAvailableTimeSlotsController } from './get-available-time-slots/get-available-time-slots.controller';

import { BookTimeSlotUseCase } from './book-time-slot/book-time-slot.usecase';
import { BookTimeSlotController } from './book-time-slot/book-time-slot.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Psychologist, TimeSlot, User])],
    controllers: [
        GetAllPsychologistsController,
        GetPsychologistWithAvailabilityController,
        GetAvailableTimeSlotsController,
        BookTimeSlotController,
    ],
    providers: [
        PsychologistRepository,
        GetAllPsychologistsUseCase,
        GetPsychologistWithAvailabilityUseCase,
        GetAvailableTimeSlotsUseCase,
        BookTimeSlotUseCase,
    ],
    exports: [
        PsychologistRepository,
        GetAllPsychologistsUseCase,
        GetPsychologistWithAvailabilityUseCase,
        GetAvailableTimeSlotsUseCase,
        BookTimeSlotUseCase,
    ],
})
export class PsychologistsModule { } 