import { BadRequestException, Controller, Post, Query } from '@nestjs/common';
import { ServerSideRequestForgeryService } from './server-side-request-forgery.service';
import axios from 'axios';

@Controller('server-side-request-forgery')
export class ServerSideRequestForgeryController {
  constructor(
    private readonly serverSideRequestForgeryService: ServerSideRequestForgeryService,
  ) {}

  @Post('broken')
  async broken(@Query('url') url: string) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new BadRequestException('Failed to fetch data from URL');
    }
  }

  @Post('fixed')
  async fixed(@Query('url') url: string) {
    if (!url.startsWith('https')) {
      throw new BadRequestException('URL must start with https');
    }

    if (url.includes('localhost')) {
      throw new BadRequestException('URL cannot contain localhost');
    }

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new BadRequestException('Failed to fetch data from URL');
    }
  }
}
