import ToggleThemeButton from "@/components/ToggleThemeButton";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Banknote, RefreshCw, TrendingUp } from "lucide-react";
import { ExchangeRateRefreshTag } from "@/data/tags";
import { refreshExchangeRate } from "./actions";


export default async function Home() {
  const isRefreshing = false;
  const exchangeRate = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/exchange`, {
    next: { tags: [ExchangeRateRefreshTag] }
  }).then(res => res.text());


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="text-center space-y-2 relative">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">EUR to PLN Exchange</h1>
          <p className="text-muted-foreground">Live exchange rates and currency conversion</p>
          <ToggleThemeButton />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Exchange Rate</CardTitle>
            <form className="contents" action={refreshExchangeRate}>
              <Button variant="ghost" size="sm" disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>
            </form>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Euro className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold">1 EUR</span>
              <span className="text-xl">=</span>
              <Banknote className="h-8 w-8 text-red-600 dark:text-red-400" />
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {exchangeRate ? `${exchangeRate} PLN` : "Loading..."}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>Placeholder</CardContent>
        </Card>
      </div>
    </div>
  );
}
