import { Module } from '@nestjs/common';
import { SyncExchangeController } from './sync-exchange.controller';
import { CurrencyEvaluationService } from './sync-exchange.service';

@Module({
  controllers: [SyncExchangeController],
  providers: [CurrencyEvaluationService],
})
export class SyncExchangeModule { }
