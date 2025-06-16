import { Module } from '@nestjs/common';
import { ExchangeCacheService } from './exchange-cache.service';

@Module({
  providers: [ExchangeCacheService],
  exports: [ExchangeCacheService],
})
export class ExchangeCacheModule { }
