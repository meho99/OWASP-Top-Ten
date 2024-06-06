import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Config } from '../config/config';
import { User } from '../users/users.entity';

@Injectable()
export class CryptographicFailuresService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly configService: ConfigService<Config, true>,
  ) {}

  async createUserBroken(email: string, password: string): Promise<User> {
    const user = await this.usersRepo.save({
      email,
      password,
    });

    return user;
  }

  async createUserFixed(email: string, password: string): Promise<User> {
    const saltRounds = this.configService.get('saltRounds', {
      infer: true,
    });
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await this.usersRepo.save({
      email,
      password: hashedPassword,
    });

    return user;
  }
}
