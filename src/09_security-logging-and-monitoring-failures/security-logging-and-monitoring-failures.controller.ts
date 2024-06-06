import { Body, Controller, Post } from '@nestjs/common';
import { SecurityLoggingAndMonitoringFailuresService } from './security-logging-and-monitoring-failures.service';
import { SecurityLoggingAndMonitoringFailuresDTO } from './security-logging-and-monitoring-failures.dto';

@Controller('security-logging-and-monitoring-failures')
export class SecurityLoggingAndMonitoringFailuresController {
  constructor(
    private readonly securityLoggingAndMonitoringFailuresService: SecurityLoggingAndMonitoringFailuresService,
  ) {}

  @Post('broken')
  broken(@Body() dto: SecurityLoggingAndMonitoringFailuresDTO) {
    return this.securityLoggingAndMonitoringFailuresService.broken(dto);
  }

  @Post('fixed')
  fixed(@Body() dto: SecurityLoggingAndMonitoringFailuresDTO) {
    return this.securityLoggingAndMonitoringFailuresService.fixed(dto);
  }
}
