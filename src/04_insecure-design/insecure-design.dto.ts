import { IsEmail, IsNotEmpty } from 'class-validator';

export class VoteForUserReqDTO {
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @IsEmail()
  voteForEmail: string;
}

export class VoteForUserResDTO {
  votes: number;
}
