'use client';

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RefreshCw } from "lucide-react";
import { useRef, useState } from "react";

export default function CalculateExchangeForm() {
  const eurAmount = useRef('');
  const [formState, setIsLoading] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<string>()

  let abortController: AbortController | undefined;

  const onSubmit = (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
    if (!eurAmount.current) return;
    abortController?.abort();
    abortController = new AbortController();
    const pendingTimeout = setTimeout(() => {
      setIsLoading('pending');
    }, 300);

    fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/exchange/calculate?eur=${eurAmount.current}`, {
      signal: abortController.signal,
    })
      .then(async (response) => {
        const text = await response.text()
        setIsLoading('success');
        setResult(text);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading('error');
      })
      .finally(() => {
        clearTimeout(pendingTimeout);
      });
  }

  return (
    <>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="eurAmount">Amount in EUR</Label>
          <Input
            id="eurAmount"
            type="number"
            step="0.01"
            min="0"
            placeholder="Enter EUR amount"
            onBlur={(e) => eurAmount.current = e.target.value}
            className="dark:bg-gray-800 dark:border-gray-600"
          />
        </div>
        <Button type="submit" className="w-full" disabled={formState === 'pending'}>
          {formState === 'pending' ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            "Convert to PLN"
          )}
        </Button>
        {formState === 'success' && (
          <p className="text-green-600 dark:text-green-400">{result}</p>
        )}
        {formState === 'error' && (
          <p className="text-red-600 dark:text-red-400">Error converting amount</p>
        )}
      </form>
    </>
  )
}
