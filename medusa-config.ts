/* import { defineConfig, loadEnv } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL!,

    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },

    cookieOptions: {
      sameSite: "none",
      secure: true,
    },
  },

  admin: {
    disable: true,
    path: "/",
    backendUrl: "https://noorayfatima-lilshop.hf.space",
  },

})*/

/// <reference types="node" />
import { defineConfig, loadEnv } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL!,

    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },

    cookieOptions: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },

  admin: {
    disable: true,
    path: "/",
    backendUrl: "https://noorayfatima-lilshop.hf.space",
  },

  // CRITICAL: This overrides any hidden supabase plugins
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