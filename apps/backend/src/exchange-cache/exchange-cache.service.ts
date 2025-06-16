import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';

export type ExchangeRate = number;

@Injectable()
export class ExchangeCacheService {
  private readonly CACHE_KEY = 'exchange_rate';
  private readonly CACHE_TTL = 60 * 1000;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  saveExchangeRate(value: ExchangeRate): Promise<ExchangeRate> {
    return this.cacheManager.set(this.CACHE_KEY, value, this.CACHE_TTL);
  }
  get cachedExchangeRate(): Promise<ExchangeRate | undefined> {
    return this.cacheManager.get(this.CACHE_KEY);
  }
}
