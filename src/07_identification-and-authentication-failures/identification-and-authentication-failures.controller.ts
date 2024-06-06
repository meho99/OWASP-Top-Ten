import { Body, Controller, Post } from '@nestjs/common';
import {
  IdentificationAndAuthenticationFailuresBrokenReqDTO,
  IdentificationAndAuthenticationFailuresFixedReqDTO,
  IdentificationAndAuthenticationFailuresResDTO,
} from './identification-and-authentication-failures.dto';

@Controller('identification-and-authentication-failures')
export class IdentificationAndAuthenticationFailuresController {
  @Post('sign-up/broken')
  signUpBroken(
    @Body() dto: IdentificationAndAuthenticationFailuresBrokenReqDTO,
  ): IdentificationAndAuthenticationFailuresResDTO {
    return {
      message: 'User created',
      user: {
        email: dto.email,
        password: dto.password,
      },
    };
  }

  @Post('sign-up/fixed')
  signUpFixed(
    @Body() dto: IdentificationAndAuthenticationFailuresFixedReqDTO,
  ): IdentificationAndAuthenticationFailuresResDTO {
    return {
      message: 'User created',
      user: {
        email: dto.email,
        password: dto.password,
      },
    };
  }
}
