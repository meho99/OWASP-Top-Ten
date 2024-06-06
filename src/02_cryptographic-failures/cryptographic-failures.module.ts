import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { CryptographicFailuresController } from './cryptographic-failures.controller';
import { CryptographicFailuresService } from './cryptographic-failures.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CryptographicFailuresController],
  providers: [CryptographicFailuresService],
})
export class CryptographicFailuresModule {}
