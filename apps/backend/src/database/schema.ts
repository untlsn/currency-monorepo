import { sql } from 'drizzle-orm';
import { sqliteTable, integer, real, text } from 'drizzle-orm/sqlite-core';

export const exchangeTransactions = sqliteTable('exchange_transactions', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  eur: real('eur').notNull(),
  pln: real('pln').notNull(),
  exchangeRate: real('exchange_rate').notNull(),
  timestamp: text('timestamp')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type ExchangeTransactions = typeof exchangeTransactions.$inferSelect;
export type NewExchangeTransactions = typeof exchangeTransactions.$inferInsert;
