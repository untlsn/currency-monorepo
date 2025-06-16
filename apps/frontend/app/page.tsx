import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="text-center space-y-2 relative">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">EUR to PLN Exchange</h1>
          <p className="text-muted-foreground">Live exchange rates and currency conversion</p>
        </div>
      </div>
    </div>
  );
}
