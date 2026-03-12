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
        min: 0, 
        max: 2, 
        idleTimeoutMillis: 30000,
        createTimeoutMillis: 30000,
        acquireTimeoutMillis: 60000
      }
    },
    // MOVED HERE: This is the correct placement for Medusa V2
    cookieOptions: {
      secure: true,      // Required for HTTPS
      sameSite: "none",  // Required for cross-domain (Vercel to Hugging Face)
      httpOnly: true,
    },
    http: {
      storeCors: "https://lilshop.vercel.app", 
      adminCors: "https://lilshop-admin.vercel.app",
      authCors: "https://lilshop-admin.vercel.app",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    disable: true,
    path: "/",
    backendUrl: "https://noorayfatima-lilshop.hf.space",
  },
  plugins: [
    {
      resolve: `@medusajs/file-local`,
      options: {
        upload_dir: "uploads",
        backend_url: "https://noorayfatima-lilshop.hf.space",
      },
    },
  ],
})