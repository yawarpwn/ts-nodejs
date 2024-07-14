import { db } from '../db'
import { asc, count, eq, getTableColumns, gt, sql } from 'drizzle-orm'
import { productsTable } from '../database'
import { commentsTable, type InsertProduct, SelectProduct, SelectComment } from '../db/schema'

export class ProductsModel {
  static async getAll() {
    // const result = await db.select().from("products").all();
    return await db.select().from(productsTable)
  }

  static async getById(id: string) {
    return db.select().from(productsTable).where(eq(productsTable.id, id))
  }

  static async create(data: any) {
    await db.insert(productsTable).values(data)
  }

  static async getProductWithCommentsCount(page: number = 1, pageSize: number = 5) {
    return db
      .select({
        ...getTableColumns(productsTable),
        commentCount: count(commentsTable.id),
      })
      .from(productsTable)
      .leftJoin(commentsTable, eq(productsTable.id, commentsTable.productId))
      .groupBy(productsTable.id)
      .orderBy(asc(productsTable.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
  }

  static async getCommentsForLast24Hours(page: number = 1, pageSize: number = 5) {
    return db
      .select({
        id: commentsTable.id,
        comment: commentsTable.comment,
      })
      .from(commentsTable)
      .where(gt(commentsTable.createAt, sql`(datetime('now','-24 hour'))`))
      .orderBy(asc(commentsTable.comment), asc(commentsTable.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
  }

  static async update(id: SelectProduct['id'], data: Partial<Omit<SelectProduct, 'id'>>) {
    return await db.update(productsTable).set(data).where(eq(productsTable.id, id))
  }

  static async delete(id: SelectProduct['id']) {
    return await db.delete(productsTable).where(eq(productsTable.id, id))
  }
}
