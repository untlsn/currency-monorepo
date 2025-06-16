import { Module } from '@nestjs/common';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { ExchangeCacheModule } from 'src/exchange-cache/exchange-cache.module';

@Module({
  controllers: [ExchangeController],
  providers: [ExchangeService],
  imports: [ExchangeCacheModule],
})
export class ExchangeModule { }
