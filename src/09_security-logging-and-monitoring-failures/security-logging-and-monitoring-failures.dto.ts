import { IsString } from 'class-validator';

export class SecurityLoggingAndMonitoringFailuresDTO {
  @IsString()
  someField: string;
}
