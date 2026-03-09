import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      connection: {
        ssl: { rejectUnauthorized: false }
      },
      pool: {
        min: 0, // Changed to 0 to be safer for Supabase Free Tier
        max: 2, // Kept very low to avoid "Too many connections" errors
        idleTimeoutMillis: 30000,
        createTimeoutMillis: 30000,
        acquireTimeoutMillis: 60000
      },
      cookieOptions: {
      secure: true,      // Required for cross-domain cookies
      sameSite: "none",  // Allows Vercel to send the cookie to Hugging Face
    }
    },
    http: {
      storeCors: process.env.STORE_CORS || "*",
      adminCors: process.env.ADMIN_CORS || "*",
      authCors: process.env.AUTH_CORS || "*",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  // THIS IS THE CRITICAL SECTION TO FIX THE STARTUP ERROR
  admin: {
    disable: true,
    path: "/",
    backendUrl: "https://noorayfatima-lilshop.hf.space",
  }
})