import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const frontendUrl = configService.get<string>('NEXT_FRONTEND_URL');

  if (!frontendUrl) {
    console.error(
      'FRONTEND_URL is not defined in environment variables. CORS may not be configured correctly.',
    );
  }

  app.enableCors({
    origin: frontendUrl,
    methods: 'GET',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
