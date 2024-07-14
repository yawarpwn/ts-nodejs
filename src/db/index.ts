import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { envs } from '../config/envs'

const client = createClient({
  url: envs.TURSO_DATABASE_URL,
  authToken: envs.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client)
