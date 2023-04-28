import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get<RmqService>(RmqService); //get dependency injection
  app.connectMicroservice(rmqService.getOptions('BILLING')); // connect to rbmq, set queue name is BILLING
  await app.startAllMicroservices();
}
bootstrap();
