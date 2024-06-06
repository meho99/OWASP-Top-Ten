import { IsEmail, IsOptional } from 'class-validator';
import { User } from '../users/users.entity';

export class SoftwareAndDataIntegrityFailuresFixedReqDTO
  implements Pick<User, 'email'>
{
  @IsOptional()
  @IsEmail()
  email: string;
}
