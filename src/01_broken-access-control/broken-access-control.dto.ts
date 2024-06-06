import { IsEmail, IsNotEmpty } from 'class-validator';

export class BrokenAccessControlReqDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class BrokenAccessControlResponseDTO {
  operationSuccess: boolean;
}
