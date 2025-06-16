import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleProvider } from './drizzle.datasource';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [DrizzleProvider],
  exports: [DrizzleProvider],
})
export class DatabaseModule { }
