import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CryptographicFailuresReqDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  password: string;
}
