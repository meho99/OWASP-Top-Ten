import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SecurityLoggingAndMonitoringFailuresDTO } from './security-logging-and-monitoring-failures.dto';

@Injectable()
export class SecurityLoggingAndMonitoringFailuresService {
  constructor(private readonly logger: Logger) {}

  broken({}: SecurityLoggingAndMonitoringFailuresDTO) {
    throw new InternalServerErrorException('Error occurred');
  }

  fixed(dto: SecurityLoggingAndMonitoringFailuresDTO) {
    this.logger.log(
      `Starting request with DTO: ${JSON.stringify(dto)}`,
      'SecurityLoggingAndMonitoringFailuresService',
    );

    // Business logic here
    // Encountered an error
    this.logger.error(
      `Error occurred while processing request, Request data: ${JSON.stringify(
        dto,
      )}`,
      'SecurityLoggingAndMonitoringFailuresService',
    );
    throw new InternalServerErrorException('Error occurred');
  }
}
