import { Module } from '@nestjs/common';
import { IdentificationAndAuthenticationFailuresController } from './identification-and-authentication-failures.controller';

@Module({
  controllers: [IdentificationAndAuthenticationFailuresController],
})
export class IdentificationAndAuthenticationFailuresModule {}
