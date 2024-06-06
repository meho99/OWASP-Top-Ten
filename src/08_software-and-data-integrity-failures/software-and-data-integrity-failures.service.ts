import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SoftwareAndDataIntegrityFailuresService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.userRepository.save({ ...data, id });
  }
}
