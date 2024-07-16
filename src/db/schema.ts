import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const productsTable = sqliteTable('products', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  price: integer('price').notNull(),
  cost: integer('cost').notNull(),
  details: text('details').notNull(),
  features: text('features'),
  ranking: integer('ranking').notNull(),
  slug: text('slug').notNull(),
  categoryId: text('category_id')
    .notNull()
    .references(() => categoriesTable.id),
  createAt: text('create_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updateAt: text('updated_at', { mode: 'text' }).$onUpdate(() =>
    new Date().toISOString(),
  ),
})

export const imagesTable = sqliteTable('images', {
  id: text('id').primaryKey(),
  large: text('large').notNull(),
  urL: text('url').notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  thumb: text('thumb').notNull(),
  title: text('title').notNull(),
  type: text('type').notNull(),
  format: text('format').notNull(),
  publicId: text('publid_id').notNull(),
  productId: text('product_id')
    .notNull()
    .references(() => productsTable.id, { onDelete: 'cascade' }),
  createAt: text('create_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const videosTable = sqliteTable('videos', {
  id: text('id').primaryKey(),
  url: text('url').notNull(),
  cover: text('cover').notNull(),
  title: text('title').notNull(),
  type: text('type').notNull(),
  format: text('format').notNull(),
  publicId: text('publid_id').notNull(),
  productId: text('product_id')
    .notNull()
    .references(() => productsTable.id, { onDelete: 'cascade' }),
  createAt: text('create_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const categoriesTable = sqliteTable('categories', {
  id: integer('id').primaryKey().notNull(),
  title: text('name').$type<['Juguetes', 'Tecnología']>().notNull(),
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
  id: integer('id').primaryKey().notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
})

export type InsertProduct = typeof productsTable.$inferInsert
export type SelectProduct = typeof productsTable.$inferSelect

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type InsertComment = typeof commentsTable.$inferInsert
export type SelectComment = typeof commentsTable.$inferSelect
