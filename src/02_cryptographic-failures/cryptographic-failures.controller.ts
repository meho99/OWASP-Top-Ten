import { Body, Controller, Post } from '@nestjs/common';
import { CryptographicFailuresService } from './cryptographic-failures.service';
import { CryptographicFailuresReqDTO } from './cryptographic-failures.dto';
import { User } from '../users/users.entity';

@Controller('cryptographic-failures')
export class CryptographicFailuresController {
  constructor(
    private readonly cryptographicFailuresService: CryptographicFailuresService,
  ) {}

  @Post('add-user/broken')
  broken(@Body() dto: CryptographicFailuresReqDTO): Promise<User> {
    return this.cryptographicFailuresService.createUserBroken(
      dto.email,
      dto.password,
    );
  }

  @Post('add-user/fixed')
  fixed(@Body() dto: CryptographicFailuresReqDTO): Promise<User> {
    return this.cryptographicFailuresService.createUserFixed(
      dto.email,
      dto.password,
    );
  }
}
