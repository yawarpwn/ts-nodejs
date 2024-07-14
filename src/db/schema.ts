import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const productsTable = sqliteTable('products', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  createAt: text('create_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

export const commentsTable = sqliteTable('comments', {
  id: text('id').primaryKey(),
  comment: text('comment').notNull(),
  productId: text('product_id')
    .notNull()
    .references(() => productsTable.id, { onDelete: 'cascade' }),
  createAt: text('create_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const usersTable = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
})

// export const postsTable = sqliteTable('posts', {
//   id: integer('id').primaryKey(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   createdAt: text('created_at')
//     .default(sql`(CURRENT_TIMESTAMP)`)
//     .notNull(),
//   updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
// });

export type InsertProduct = typeof productsTable.$inferInsert
export type SelectProduct = typeof productsTable.$inferSelect

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type InsertComment = typeof commentsTable.$inferInsert
export type SelectComment = typeof commentsTable.$inferSelect
