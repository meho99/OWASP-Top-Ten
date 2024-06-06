import { Module } from '@nestjs/common';
import { InjectionService } from './injection.service';
import { InjectionController } from './injection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [InjectionController],
  providers: [InjectionService],
})
export class InjectionModule {}
