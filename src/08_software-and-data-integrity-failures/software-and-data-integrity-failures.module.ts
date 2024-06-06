import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { SoftwareAndDataIntegrityFailuresController } from './software-and-data-integrity-failures.controller';
import { SoftwareAndDataIntegrityFailuresService } from './software-and-data-integrity-failures.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SoftwareAndDataIntegrityFailuresController],
  providers: [SoftwareAndDataIntegrityFailuresService],
})
export class SoftwareAndDataIntegrityFailuresModule {}
