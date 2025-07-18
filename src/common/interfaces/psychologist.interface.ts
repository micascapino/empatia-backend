export interface TimeSlot {
  id: string;
  startDate: Date;
  endDate: Date;
  available: boolean;
  psychologistId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Psychologist {
  id: string;
  name: string;
  specializations: string[];
  rating: number;
  experience: number;
  avatar: string;
  bio: string;
  pricePerSession: number;
  languages: string[];
  education: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PsychologistWithAvailability extends Psychologist {
  availability: TimeSlot[];
} 