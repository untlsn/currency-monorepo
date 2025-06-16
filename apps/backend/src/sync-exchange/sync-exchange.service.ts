import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ExchangeCacheService } from 'src/exchange-cache/exchange-cache.service';

type DummyApiResponse = { exchange_rate: number };
type ExchangeRate = number;

@Injectable()
export class CurrencyEvaluationService {
  private readonly dummyApiUrl: string;
  private readonly dummyApiKey: string;

  constructor(
    private exchangeCacheService: ExchangeCacheService,
    private configService: ConfigService,
  ) {
    const dummyApiUrl = this.configService.get<string>('DUMMY_API_URL');
    const dummyApiKey = this.configService.get<string>('DUMMY_API_API_KEY');

    if (!dummyApiUrl || !dummyApiKey) {
      throw new Error(
        'DUMMY_API_URL or DUMMY_API_API_KEY is not set in environment variables!',
      );
    }

    this.dummyApiUrl = dummyApiUrl;
    this.dummyApiKey = dummyApiKey;
  }

  private async fetchDummyApiData(): Promise<ExchangeRate> {
    try {
      const { data } = await axios.get<DummyApiResponse>(this.dummyApiUrl, {
        headers: {
          'x-api-key': this.dummyApiKey,
        },
      });
      return data.exchange_rate;
    } catch (error) {
      if (error instanceof Error)
        console.error('Error fetching data from DUMMY_API:', error.message);
      throw new InternalServerErrorException(
        'Failed to fetch data from external API.',
      );
    }
  }

  async getExchangeRate(): Promise<ExchangeRate> {
    return (
      (await this.exchangeCacheService.cachedExchangeRate) ??
      this.exchangeCacheService.saveExchangeRate(await this.fetchDummyApiData())
    );
  }
}
