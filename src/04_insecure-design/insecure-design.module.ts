import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { InsecureDesignController } from './insecure-design.controller';
import { InsecureDesignService } from './insecure-design.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [InsecureDesignController],
  providers: [InsecureDesignService],
})
export class InsecureDesignModule {}
