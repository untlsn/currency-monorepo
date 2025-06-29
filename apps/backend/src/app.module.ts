import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ExchangeModule } from './exchange/exchange.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ExchangeModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CacheModule.register({
      ttl: 60 * 1000,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
