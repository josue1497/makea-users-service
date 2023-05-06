import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigClientService } from './config/config-client.service';
import { ConfigModule } from './config/config.module';

async function bootstrap() {
  try {
    const configContext = await NestFactory.createApplicationContext(
      ConfigModule,
    );
    const configService = configContext.get(ConfigClientService);
    const config = await configService.getConfigByService('users');

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [
            config.RABBITMQ_URL,
          ],
          queue: config.RMQ_USER_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    );
    app.listen();
    await configContext.close();
    console.log('User Microservice is listening')
  } catch (e) {
    console.error(e.message)
  }

}
bootstrap();
