import { Module } from '@nestjs/common';
import { ServerSideRequestForgeryService } from './server-side-request-forgery.service';
import { ServerSideRequestForgeryController } from './server-side-request-forgery.controller';

@Module({
  controllers: [ServerSideRequestForgeryController],
  providers: [ServerSideRequestForgeryService]
})
export class ServerSideRequestForgeryModule {}
