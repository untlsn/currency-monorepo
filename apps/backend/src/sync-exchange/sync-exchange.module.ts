import { Module } from '@nestjs/common';
import { SyncExchangeController } from './sync-exchange.controller';
import { CurrencyEvaluationService } from './sync-exchange.service';
import { ExchangeCacheModule } from 'src/exchange-cache/exchange-cache.module';

@Module({
  controllers: [SyncExchangeController],
  providers: [CurrencyEvaluationService],
  imports: [ExchangeCacheModule],
})
export class SyncExchangeModule { }
