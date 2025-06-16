import { Controller, Get, Query } from '@nestjs/common';
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

  @Get('calculate')
  async calculateTransaction(@Query('eur') eur: number) {
    return this.exchangeService.calculateTransaction(eur);
  }
}
