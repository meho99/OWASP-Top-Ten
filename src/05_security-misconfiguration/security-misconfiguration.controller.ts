import { Controller, Post } from '@nestjs/common';
import { SecurityMisconfigurationService } from './security-misconfiguration.service';

@Controller('security-misconfiguration')
export class SecurityMisconfigurationController {
  constructor(
    private readonly securityMisconfigurationService: SecurityMisconfigurationService,
  ) {}

  @Post('broken')
  broken(): Promise<void> {
    return this.securityMisconfigurationService.brokenErrorHandling();
  }

  @Post('fixed')
  fixed() {
    return this.securityMisconfigurationService.fixedErrorHandling();
  }
}
