import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { DB, DRIZZLE_ORM } from 'src/database/drizzle.datasource';
import { exchangeTransactions, NewExchangeTransactions } from 'src/database/schema';
import { ExchangeCacheService } from 'src/exchange-cache/exchange-cache.service';

type DummyApiResponse = { exchange_rate: number };
type ExchangeRate = number;

@Injectable()
export class ExchangeService {
  private readonly dummyApiUrl: string;
  private readonly dummyApiKey: string;

  constructor(
    private exchangeCacheService: ExchangeCacheService,
    private configService: ConfigService,
    @Inject(DRIZZLE_ORM) private db: DB,
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

  async calculateExchange(amount: number): Promise<number> {
    return amount * (await this.getExchangeRate());
  }

  getTransactions() {
    return this.db.query.exchangeTransactions.findMany();
  }

  private saveTransaction(transaction: NewExchangeTransactions) {
    this.db.insert(exchangeTransactions).values(transaction);
  }

  async calculateTransaction(eur: number) {
    const exchangeRate = await this.getExchangeRate();
    const pln = eur * exchangeRate;

    this.saveTransaction({
      eur,
      pln,
      exchangeRate,
    });
    return pln;
  }
}
