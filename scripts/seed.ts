import { db } from '../src/db/index'

import products from '../src/products.json'
import {
  usersTable,
  productsTable,
  imagesTable,
  videosTable,
} from '../src/db/schema'

const CATEGORIES = { Juguetes: 1, Tecnologia: 2 }

async function main() {
  products.forEach(async (product) => {
    // const productId = crypto.randomUUID()
    // const videoId = crypto.randomUUID()
    // product.id = productId
    // await db.insert(productsTable).values({
    //   id: product.id,
    //   title: product.title,
    //   price: product.price,
    //   cost: product.cost,
    //   details: JSON.stringify(product.details),
    //   ranking: product.ranking,
    //   slug: product.slug,
    //   categoryId: CATEGORIES[product.category] ?? 3,
    // })
    // console.log('insert product')

    // product.images.forEach(async (img) => {
    //   await db
    //     .insert(imagesTable)
    //     .values({
    //       id: img.id,
    //       large: img.large,
    //       urL: img.url,
    //       width: img.width,
    //       height: img.height,
    //       thumb: img.thumb,
    //       title: img.title,
    //       type: img.type,
    //       format: img.format,
    //       publicId: img.publid_id,
    //       productId: product.id,
    //     })
    //     .catch((err) => {
    //       if (err) {
    //         console.log(err)
    //         console.log('fall', img.title)
    //         return
    //       }
    //     })
    //
    //   console.log('insert img')
    // })

    if (product.video) {
      console.log(product.video)
      product.video.id = crypto.randomUUID()
      await db.insert(videosTable).values({
        id: product.video.id,
        url: product.video.url,
        cover: product.video.cover,
        title: product.video.title,
        type: 'video', //TODO:
        format: 'mp4', //TODO:
        publicId: product.video.product_id,
        productId: product.id,
      })
      console.log('insert video')
    }
  })

  // await db.insert(usersTable).values({
  //   id: '1',
  //   email: 'admin@mail.com',
  //   password: 'admin',
  // })
  // const product = products[0]
  // await db.insert(productsTable).values({
  //   id: product.id,
  //   title: product.title,
  //   price: product.price,
  //   cost: product.cost,
  //   details: JSON.stringify(product.details),
  //   ranking: product.ranking,
  //   slug: product.slug,
  //   categoryId: '1',
  // })
  // console.log(await db.select().from(productsTable).values())
}

main()
  .then((res) => console.log('success'))
  .catch((err) => {
    console.log(err)
  })
