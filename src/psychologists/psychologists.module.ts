import { Module } from '@nestjs/common';
import { PsychologistRepository } from './infrastructure/repositories/psychologist.repository';
import { UserRepository } from './infrastructure/repositories/user.repository';

import { GetAllPsychologistsUseCase } from './get-all-psychologists/get-all-psychologists.usecase';
import { GetAllPsychologistsController } from './get-all-psychologists/get-all-psychologists.controller';

import { GetPsychologistWithAvailabilityUseCase } from './get-psychologist-with-availability/get-psychologist-with-availability.usecase';
import { GetPsychologistWithAvailabilityController } from './get-psychologist-with-availability/get-psychologist-with-availability.controller';

import { GetAvailableTimeSlotsUseCase } from './get-available-time-slots/get-available-time-slots.usecase';
import { GetAvailableTimeSlotsController } from './get-available-time-slots/get-available-time-slots.controller';

import { BookTimeSlotUseCase } from './book-time-slot/book-time-slot.usecase';
import { BookTimeSlotController } from './book-time-slot/book-time-slot.controller';

@Module({
    controllers: [
        GetAllPsychologistsController,
        GetPsychologistWithAvailabilityController,
        GetAvailableTimeSlotsController,
        BookTimeSlotController,
    ],
    providers: [
        PsychologistRepository,
        UserRepository,
        GetAllPsychologistsUseCase,
        GetPsychologistWithAvailabilityUseCase,
        GetAvailableTimeSlotsUseCase,
        BookTimeSlotUseCase,
    ],
    exports: [
        PsychologistRepository,
        UserRepository,
        GetAllPsychologistsUseCase,
        GetPsychologistWithAvailabilityUseCase,
        GetAvailableTimeSlotsUseCase,
        BookTimeSlotUseCase,
    ],
})
export class PsychologistsModule { } 