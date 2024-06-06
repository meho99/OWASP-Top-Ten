import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setMiddlewares } from './helpers/setMiddlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  setMiddlewares(app);
}
bootstrap();
