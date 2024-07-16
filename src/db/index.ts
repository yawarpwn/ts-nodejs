import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { envs } from '../config/envs'

const client = createClient({
  url: 'http://127.0.0.1:8080',
  // authToken: envs.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client)
