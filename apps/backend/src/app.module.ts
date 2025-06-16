import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SyncExchangeModule } from './sync-exchange/sync-exchange.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    SyncExchangeModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      ttl: 60 * 1000,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
