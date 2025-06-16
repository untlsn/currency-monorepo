'use server';

import { revalidateTag } from 'next/cache';
import { ExchangeRateRefreshTag } from '@/data/tags';

export async function refreshExchangeRate() {
  revalidateTag(ExchangeRateRefreshTag);
}