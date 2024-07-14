import express from 'express'
import { envs } from './config/envs'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { productsRouter } from './routes/products'

async function main() {
  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())
  app.use(express.urlencoded({ extended: true }))

  // app.use(appRoutes);
  app.use('/api/products', productsRouter)

  app.listen(envs.PORT, () => {
    console.log(`Server running on port -- ${envs.PORT}`)
  })
}

main()
