import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { createClient } from '@libsql/client';

export const DRIZZLE_ORM = 'DRIZZLE_ORM';

export const DrizzleProvider: FactoryProvider = {
  provide: DRIZZLE_ORM,
  useFactory: (configService: ConfigService) => {
    const sqlitePath = configService.get<string>('DATABASE_URL');

    if (!sqlitePath) {
      throw new Error('DATABASE_URL is not set in environment variables!');
    }

    const sqlite = createClient({ url: sqlitePath });
    return drizzle(sqlite, { schema, logger: true });
  },
  inject: [ConfigService],
};

export type DB = ReturnType<typeof drizzle<typeof schema>>;
