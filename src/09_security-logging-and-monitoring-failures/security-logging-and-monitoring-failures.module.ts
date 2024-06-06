import { Logger, Module } from '@nestjs/common';
import { SecurityLoggingAndMonitoringFailuresService } from './security-logging-and-monitoring-failures.service';
import { SecurityLoggingAndMonitoringFailuresController } from './security-logging-and-monitoring-failures.controller';

@Module({
  controllers: [SecurityLoggingAndMonitoringFailuresController],
  providers: [SecurityLoggingAndMonitoringFailuresService, Logger],
})
export class SecurityLoggingAndMonitoringFailuresModule {}
