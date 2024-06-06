import { Module } from '@nestjs/common';
import { SecurityMisconfigurationService } from './security-misconfiguration.service';
import { SecurityMisconfigurationController } from './security-misconfiguration.controller';

@Module({
  controllers: [SecurityMisconfigurationController],
  providers: [SecurityMisconfigurationService]
})
export class SecurityMisconfigurationModule {}
