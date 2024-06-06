import { Body, Controller, Post } from '@nestjs/common';
import { InsecureDesignService } from './insecure-design.service';
import { VoteForUserReqDTO, VoteForUserResDTO } from './insecure-design.dto';

@Controller('insecure-design')
export class InsecureDesignController {
  constructor(private readonly insecureDesignService: InsecureDesignService) {}

  @Post('vote/broken')
  broken(@Body() dto: VoteForUserReqDTO): Promise<VoteForUserResDTO> {
    return this.insecureDesignService.voteForUserBroken(dto);
  }

  @Post('vote/fixed')
  fixed(@Body() dto: VoteForUserReqDTO): Promise<VoteForUserResDTO> {
    return this.insecureDesignService.voteForUserFixed(dto);
  }
}
