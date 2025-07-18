import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Psychologist, TimeSlot, User } from '../entities';

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Psychologist, TimeSlot, User],
    synchronize: false,
    logging: !isProduction,
    namingStrategy: new SnakeNamingStrategy(),
    extra: {
      dateStrings: false,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    },
  };
}; 