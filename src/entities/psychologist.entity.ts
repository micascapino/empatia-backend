import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TimeSlot } from '@/entities'

@Entity('psychologists')
export class Psychologist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', array: true })
  specializations: string[];

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0.0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  experience: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'int', name: 'price_per_session' })
  pricePerSession: number;

  @Column({ type: 'text', array: true, default: [] })
  languages: string[];

  @Column({ type: 'text', array: true, default: [] })
  education: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => TimeSlot, timeSlot => timeSlot.psychologist)
  timeSlots: TimeSlot[];
} 