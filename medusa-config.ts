import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // CRITICAL: Manage the connection pool for Supabase Free Tier
    databaseDriverOptions: {
      connection: {
        ssl: { rejectUnauthorized: false }
      },
      pool: {
        min: 1,      // Minimum active connections
        max: 3,      // Lower this for Free Tier (Supabase Nano limit is 15 total)
        idleTimeoutMillis: 30000,
        createTimeoutMillis: 30000,
        acquireTimeoutMillis: 60000 // Give it more time to "acquire" the connection
      }
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})