import { ProductsModel } from '../models/products'

import { Request, Response } from 'express'
export class ProductsController {
  static async getAll(req: Request, res: Response) {
    const products = await ProductsModel.getAll()
    res.json(products)
  }

  static async create(req: Request, res: Response) {
    const data = req.body
    const product = await ProductsModel.create(data)
    res.json(product)
  }
}
