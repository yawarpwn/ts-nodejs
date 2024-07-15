import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// {
// 	"id": "5d652261-2ad5-4ba1-8091-8e43a23bed35",
// 	"title": "Keychron Teclado mecánico inalámbrico Bluetooth K3 versión 2, 84 teclas 75% diseño blanco LED retroiluminado teclado con cable para Mac Windows, con interruptor mecánico marrón Gateron de perfil bajo",
// 	"price": 400,
// 	"cost": 323,
// 	"category": "Tecnologia",
// 	"ranking": 4.7,
// 	"images": [
// 			"id": "a5c21b3e-3226-45e7-94e8-db295799d94d",
// 			"large": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1716164049/neystore/c8trmrobqq4ugkdxatss.jpg",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/c_scale,h_500/v1/neystore/c8trmrobqq4ugkdxatss?_a=BAMADKJt0",
// 			"format": "jpg",
// 			"width": 1500,
// 			"height": 1451,
// 			"product_id": "5d652261-2ad5-4ba1-8091-8e43a23bed35",
// 			"publid_id": "neystore/c8trmrobqq4ugkdxatss",
// 			"type": "image",
// 			"title": "Keychron Teclado mecánico inalámbrico Bluetooth K3 versión 2, 84 teclas 75% diseño blanco LED retroiluminado teclado con cable para Mac Windows, con interruptor mecánico marrón Gateron de perfil bajo",
// 			"thumb": "https://res.cloudinary.com/dyshhk5h6/image/upload/c_thumb,h_100/v1/neystore/c8trmrobqq4ugkdxatss?_a=BAMADKJt0"
// 		}
// 	],
// 	"video": {
// 		"id": "a3ac0099-ac52-428a-9300-5e76c1fc8890",
// 		"url": "https://res.cloudinary.com/dyshhk5h6/video/upload/v1716164047/neystore/jxmwnouwuh2deyn4cpyg.mp4",
// 		"format": "mp4",
// 		"width": 850,
// 		"height": 480,
// 		"product_id": "5d652261-2ad5-4ba1-8091-8e43a23bed35",
// 		"publid_id": "neystore/jxmwnouwuh2deyn4cpyg",
// 		"type": "video",
// 		"cover": "https://m.media-amazon.com/images/I/51z+xP2j+CL.SX522_.jpg",
// 		"title": "Keychron K3 Ultra-Slim Wireless Mechanical Keyboard"
// 	},
// 	"features": [],
// 	,
// 	"details": {},
// 	"slug"
// }

export const productsTable = sqliteTable('products', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  price: integer('price').notNull(),
  cost: integer('cost').notNull(),
  details: text('details').notNull(),
  features: text('features'),
  categoryId: text('category_id')
    .notNull()
    .references(() => categoriesTable.id),
  createAt: text('create_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const imagesTable = sqliteTable('images', {
  id: text('id').primaryKey(),
  large: text('url').notNull(),
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
  id: text('id').primaryKey(),
  name: text('name').$type<['Juguetes', 'Tecnología']>().notNull(),
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

export type InsertProduct = typeof productsTable.$inferInsert
export type SelectProduct = typeof productsTable.$inferSelect

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type InsertComment = typeof commentsTable.$inferInsert
export type SelectComment = typeof commentsTable.$inferSelect
