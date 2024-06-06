import { Body, Controller, Param, Patch } from '@nestjs/common';
import { User } from '../users/users.entity';
import { SoftwareAndDataIntegrityFailuresService } from './software-and-data-integrity-failures.service';
import { SoftwareAndDataIntegrityFailuresFixedReqDTO } from './software-and-data-integrity-failures.dto';

/**
 * Controller dealing with software-and-data-integrity-failures. In this example, we're assuming that the request was supposed to be made from a React application that has a form to update a user.
 * `broken()` method works fine in case of request made from a React application that has a form to update a user with proper validation,
 * but in case the request is made outside of the application, an attacker can send a request containing a role that is not allowed to be updated and gain admin access.
 * and `fixed()` fixes this issue by adding proper input data validation and does not allow to pass and modify the role field.
 */
@Controller('software-and-data-integrity-failures')
export class SoftwareAndDataIntegrityFailuresController {
  constructor(
    private readonly softwareAndDataIntegrityFailuresService: SoftwareAndDataIntegrityFailuresService,
  ) {}

  @Patch(':id/broken')
  broken(@Param('id') id: string, @Body() body: any): Promise<User> {
    return this.softwareAndDataIntegrityFailuresService.updateUser(+id, body);
  }

  @Patch(':id/fixed')
  fixed(
    @Param('id') id: string,
    @Body() body: SoftwareAndDataIntegrityFailuresFixedReqDTO,
  ): Promise<User> {
    return this.softwareAndDataIntegrityFailuresService.updateUser(+id, body);
  }
}
