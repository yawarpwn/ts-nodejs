import { createClient } from '@libsql/client'

async function main() {
  const db = createClient({
    url: 'sqlite:src/db/neystore.db',
  })

  await db.execute(`
  CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
  )`)

  await db.execute({
    sql: 'INSERT INTO users (id, username, password) VALUES (?, ?, ?)',
    args: ['1', 'admin', 'admin'],
  })

  const rows = await db.execute('SELECT * FROM users')
  console.log(rows.rows)
}

main()
