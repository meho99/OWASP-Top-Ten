import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InjectionService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsersBroken(email: string): Promise<User[]> {
    return this.userRepository.query(
      `SELECT * FROM users WHERE email = '${email}'`,
    );
  }

  async getUsersFixed(email: string): Promise<User[]> {
    return this.userRepository.findBy({ email });
  }
}
