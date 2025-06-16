import { Controller, Get } from '@nestjs/common';
import { CurrencyEvaluationService } from './sync-exchange.service';

@Controller('api/sync-exchange')
export class SyncExchangeController {
  constructor(
    private readonly currencyEvaluationService: CurrencyEvaluationService,
  ) { }

  @Get()
  async syncExchange() {
    return this.currencyEvaluationService.fetchDummyApiData();
  }
}
