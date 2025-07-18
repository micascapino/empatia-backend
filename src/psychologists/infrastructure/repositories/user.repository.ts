import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../../../src/entities';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  private readonly userRepository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findOrCreateUser(userData: {
    name: string;
    email: string;
    phone?: string;
    notes?: string;
  }): Promise<User> {
    try {
      let user = await this.userRepository.findOne({
        where: { email: userData.email }
      });

      if (!user) {
        user = this.userRepository.create({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          notes: userData.notes,
          active: true,
        });
        await this.userRepository.save(user);
        this.logger.log(`Created new user with email: ${userData.email}`);
      }

      return user;
    } catch (error) {
      this.logger.error(`Error finding or creating user with email: ${userData.email}`, error);
      throw error;
    }
  }


} 