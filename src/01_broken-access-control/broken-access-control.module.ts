import { Module } from '@nestjs/common';
import { BrokenAccessControlController } from './broken-access-control.controller';
import { BrokenAccessControlService } from './broken-access-control.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [BrokenAccessControlController],
  providers: [BrokenAccessControlService],
})
export class BrokenAccessControlModule {}
