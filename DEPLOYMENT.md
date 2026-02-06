# Deployment Guide - SynthLab

## Quick Deploy to Vercel (Recommended)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/synthlab)

### Manual Deployment

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd synthlab
vercel
```

4. **Set Environment Variables**

In Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add: `ANTHROPIC_API_KEY` = `sk-ant-your-key-here`
- Redeploy: `vercel --prod`

### Environment Variables

Required:
```
ANTHROPIC_API_KEY=sk-ant-api-03-your-actual-key-here
```

Optional (for production):
```
NEXT_PUBLIC_API_URL=https://your-domain.com
RATE_LIMIT_REQUESTS_PER_HOUR=100
```

## Deploy to Other Platforms

### Netlify

1. **netlify.toml**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. **Deploy**
```bash
netlify deploy --prod
```

### Railway

1. **Install Railway CLI**
```bash
npm i -g @railway/cli
```

2. **Initialize**
```bash
railway init
```

3. **Add environment variables**
```bash
railway variables set ANTHROPIC_API_KEY=sk-ant-your-key
```

4. **Deploy**
```bash
railway up
```

### Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  synthlab:
    build: .
    ports:
      - "3000:3000"
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    restart: unless-stopped
```

**Run:**
```bash
docker-compose up -d
```

## Production Considerations

### 1. Rate Limiting

Add rate limiting to prevent abuse:

**Install middleware:**
```bash
npm install @upstash/ratelimit @upstash/redis
```

**Create middleware:**
```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
});

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
}
```

### 2. Authentication

Add NextAuth for user management:

```bash
npm install next-auth
```

### 3. Database (PostgreSQL)

Store generation history and user datasets:

```bash
npm install @vercel/postgres
```

**Schema:**
```sql
CREATE TABLE generations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255),
  prompt TEXT,
  num_records INT,
  created_at TIMESTAMP DEFAULT NOW(),
  dataset JSONB
);
```

### 4. Monitoring

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

**Add to layout.tsx:**
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 5. Error Tracking

**Sentry:**
```bash
npm install @sentry/nextjs
```

**Configure:**
```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### 6. Caching

Add Redis caching for common prompts:

```typescript
// lib/cache.ts
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function getCachedData(key: string) {
  return await redis.get(key);
}

export async function setCachedData(key: string, data: any, ttl = 3600) {
  await redis.set(key, data, { ex: ttl });
}
```

### 7. Cost Optimization

**Implement smart batching:**
```typescript
// Reduce API calls by caching templates
const COMMON_TEMPLATES = {
  'customer_support': { fields: [...], examples: [...] },
  'transactions': { fields: [...], examples: [...] },
  // etc.
};
```

**Usage-based pricing:**
```typescript
// Track API usage per user
async function trackUsage(userId: string, records: number) {
  await db.usage.create({
    userId,
    recordsGenerated: records,
    costInCents: records * 0.01,
    timestamp: new Date(),
  });
}
```

## Post-Deployment Checklist

- [ ] Environment variables set correctly
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Rate limiting configured
- [ ] Analytics tracking
- [ ] Error monitoring (Sentry)
- [ ] Custom domain configured
- [ ] SEO metadata optimized
- [ ] Performance testing complete
- [ ] CORS configured if needed
- [ ] Backup strategy in place

## Performance Benchmarks

Target metrics:
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **API Response Time**: < 5s for 100 records
- **Lighthouse Score**: > 90

## Scaling Strategy

### Phase 1 (MVP - Current)
- Single Vercel deployment
- Direct Claude API calls
- No database

### Phase 2 (Growth)
- Add PostgreSQL for user data
- Implement caching layer
- User authentication
- Rate limiting per tier

### Phase 3 (Scale)
- Queue system for large generations (Bull/BullMQ)
- Separate API service
- Load balancing
- CDN for static assets

## Support & Troubleshooting

**Common Issues:**

1. **"API Key Invalid"**
   - Check environment variable name
   - Verify key has no extra spaces
   - Confirm key is active in Anthropic console

2. **"Function Timeout"**
   - Vercel has 10s limit on Hobby plan
   - Upgrade to Pro for 60s
   - Or reduce batch size

3. **"Rate Limited"**
   - Implement request queuing
   - Add user-facing rate limit warnings
   - Consider upgrading Anthropic plan

## Monitoring Dashboard

Recommended metrics to track:

- Total API calls / day
- Average generation time
- Error rate
- Cost per generation
- User retention
- Popular prompt types

**Tools:**
- Vercel Analytics
- Anthropic API Dashboard
- Custom Postgres queries
- Sentry for errors

---

**Questions?** Open an issue or contact support.
