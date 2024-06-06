import { Controller, Get, Query } from '@nestjs/common';
import { User } from '../users/users.entity';
import { InjectionService } from './injection.service';

@Controller('injection')
export class InjectionController {
  constructor(private readonly injectionService: InjectionService) {}

  @Get('broken')
  broken(@Query('email') email: string): Promise<User[]> {
    return this.injectionService.getUsersBroken(email);
  }

  @Get('fixed')
  fixed(@Query('email') email: string): Promise<User[]> {
    return this.injectionService.getUsersFixed(email);
  }
}
