import { Controller, Get } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller('api/exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) { }

  @Get()
  async syncExchange() {
    return this.exchangeService.getExchangeRate();
  }

  @Get('transactions')
  async getTransactions() {
    return this.exchangeService.getTransactions();
  }
}
