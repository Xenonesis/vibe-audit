// Synthetic fixture: Source uses environment variables without fallback or .env.example
export const config = {
  dbUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
  secretKey: process.env.SECRET_KEY,
  stripeSecret: process.env.STRIPE_SECRET_KEY,
};
