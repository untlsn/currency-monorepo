CREATE TABLE `exchange_transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`eur` real NOT NULL,
	`pln` real NOT NULL,
	`exchange_rate` real NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
