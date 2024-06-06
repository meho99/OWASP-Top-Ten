import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../users/users.entity';
import { Repository } from 'typeorm';
import {
  BrokenAccessControlReqDTO,
  BrokenAccessControlResponseDTO,
} from './broken-access-control.dto';

@Injectable()
export class BrokenAccessControlService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  private async resolveUser(email: string): Promise<User> {
    const user = await this.usersRepo.findOneBy({
      email,
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async broken({
    email,
  }: BrokenAccessControlReqDTO): Promise<BrokenAccessControlResponseDTO> {
    await this.resolveUser(email);

    return { operationSuccess: true };
  }

  async fixed({
    email,
  }: BrokenAccessControlReqDTO): Promise<BrokenAccessControlResponseDTO> {
    const user = await this.resolveUser(email);

    if (user.role !== UserRole.Admin) {
      throw new ForbiddenException(
        'User is not allowed to perform this operation',
      );
    }

    return { operationSuccess: true };
  }
}
