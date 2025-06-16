# Monorepo of currency exchange app

### Installation

```bash
pnpm install
```

## NestJS Backend

### Development

```bash
pnpm --filter backend run start:dev
```

### Build

```bash
pnpm --filter backend run build
```

### Production

```bash
pnpm --filter backend run start:prod
```

### Database

#### Migrate

```bash
pnpm --filter backend run db:migrate
```

#### Push

```bash
pnpm --filter backend run db:push
```

#### Generate

```bash
pnpm --filter backend run db:generate
```

## NextJS Frontend

### Development

```bash
pnpm --filter frontend run dev
```

### Build

```bash
pnpm --filter frontend run build
```

### Production

```bash
pnpm --filter frontend run start
```





