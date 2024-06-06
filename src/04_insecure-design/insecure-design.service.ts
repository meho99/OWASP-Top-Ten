import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { VoteForUserReqDTO, VoteForUserResDTO } from './insecure-design.dto';

/**
 * Service responsible for handling insecure design issues
 * It contains two methods to vote for a user, one broken and one fixed
 * The broken method does not check if the user has already voted or if the user is voting for themselves
 * The fixed method checks if the user has already voted and if the user is voting for themselves
 */
@Injectable()
export class InsecureDesignService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  private async resolveUser(email: string): Promise<User> {
    const user = await this.usersRepo.findOneBy({
      email,
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async voteForUserBroken({
    userEmail,
    voteForEmail,
  }: VoteForUserReqDTO): Promise<VoteForUserResDTO> {
    await this.resolveUser(userEmail);
    const voteForUser = await this.resolveUser(voteForEmail);

    const updatedVotesCount = voteForUser.votes + 1;

    await this.usersRepo.update(voteForUser.id, {
      votes: updatedVotesCount,
    });

    return { votes: updatedVotesCount };
  }

  async voteForUserFixed({
    userEmail,
    voteForEmail,
  }: VoteForUserReqDTO): Promise<VoteForUserResDTO> {
    const user = await this.resolveUser(userEmail);
    const voteForUser = await this.resolveUser(voteForEmail);

    if (user.id === voteForUser.id) {
      throw new BadRequestException('User cannot vote for themselves');
    }

    if (user.hasVoted) {
      throw new BadRequestException('User has already voted');
    }

    const updatedVotesCount = voteForUser.votes + 1;

    await this.usersRepo.update(voteForUser.id, {
      votes: updatedVotesCount,
    });

    await this.usersRepo.update(user.id, {
      hasVoted: true,
    });

    return { votes: updatedVotesCount };
  }
}
