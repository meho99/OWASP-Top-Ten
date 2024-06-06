import { Body, Controller, Post } from '@nestjs/common';
import {
  BrokenAccessControlReqDTO,
  BrokenAccessControlResponseDTO,
} from './broken-access-control.dto';
import { BrokenAccessControlService } from './broken-access-control.service';

@Controller('broken-access-control')
export class BrokenAccessControlController {
  constructor(
    private readonly brokenAccessControlService: BrokenAccessControlService,
  ) {}

  @Post('admin-only/broken')
  broken(
    @Body() dto: BrokenAccessControlReqDTO,
  ): Promise<BrokenAccessControlResponseDTO> {
    return this.brokenAccessControlService.broken(dto);
  }

  @Post('admin-only/fixed')
  fixed(
    @Body() dto: BrokenAccessControlReqDTO,
  ): Promise<BrokenAccessControlResponseDTO> {
    return this.brokenAccessControlService.fixed(dto);
  }
}
