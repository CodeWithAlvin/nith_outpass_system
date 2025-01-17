import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  schema: './src/lib/db/schema.js',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host:process.env.DB_HOST??'',
    port:Number(process.env.DB_PORT??5432),
    user:process.env.DB_USER??'',
    password:process.env.DB_PASSWORD??'',
    database:process.env.DB_NAME??'',
  },
  verbose: true,
  strict: true,
})
