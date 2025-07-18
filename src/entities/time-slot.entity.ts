import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Psychologist, User } from '../entities';

@Entity('time_slots')
export class TimeSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'psychologist_id' })
  psychologistId: string;

  @Column({ type: 'timestamp with time zone', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamp with time zone', name: 'end_date' })
  endDate: Date;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @Column({ type: 'uuid', name: 'user_id', nullable: true })
  userId?: string;

  @ManyToOne(() => User, user => user.timeSlots, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ type: 'text', name: 'booking_notes', nullable: true })
  bookingNotes?: string;

  @Column({ type: 'boolean', name: 'virtual_session', default: true })
  virtualSession: boolean;

  @Column({ type: 'boolean', name: 'clinic_session', default: true })
  clinicSession: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Psychologist, psychologist => psychologist.timeSlots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'psychologist_id' })
  psychologist: Psychologist;
} 