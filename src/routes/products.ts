import { Router } from 'express'
import { ProductsController } from '../controllers/products'

export const productsRouter = Router()

productsRouter.get('/', ProductsController.getAll)
productsRouter.post('/', ProductsController.create)
