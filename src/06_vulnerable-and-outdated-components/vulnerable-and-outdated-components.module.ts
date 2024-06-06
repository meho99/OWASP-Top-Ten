import { Module } from '@nestjs/common';
import { VulnerableAndOutdatedComponentsService } from './vulnerable-and-outdated-components.service';

@Module({
  providers: [VulnerableAndOutdatedComponentsService],
})
export class VulnerableAndOutdatedComponentsModule {}
