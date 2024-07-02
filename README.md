## MVC architecture

```
├── src/
│ ├── controllers/
│ │ ├── userController.ts
│ │ ├── productController.ts
│ │ └── index.ts
│ ├── models/
│ │ ├── userModel.ts
│ │ ├── productModel.ts
│ │ └── index.ts
│ ├── routes/
│ │ ├── userRoutes.ts
│ │ ├── productRoutes.ts
│ │ └── index.ts
│ ├── services/
│ │ ├── userService.ts
│ │ ├── productService.ts
│ │ └── index.ts
│ ├── middlewares/
│ │ ├── authMiddleware.ts
│ │ ├── errorMiddleware.ts
│ │ └── index.ts
│ ├── config/
│ │ ├── db.ts
│ │ ├── env.ts
│ │ └── index.ts
│ ├── utils/
│ │ ├── logger.ts
│ │ └── index.ts
│ ├── app.ts
│ └── server.ts
├── tests/
│ ├── controllers/
│ │ ├── userController.test.ts
│ │ ├── productController.test.ts
│ │ └── index.test.ts
│ ├── models/
│ │ ├── userModel.test.ts
│ │ ├── productModel.test.ts
│ │ └── index.test.ts
│ ├── routes/
│ │ ├── userRoutes.test.ts
│ │ ├── productRoutes.test.ts
│ │ └── index.test.ts
│ ├── services/
│ │ ├── userService.test.ts
│ │ ├── productService.test.ts
│ │ └── index.test.ts
│ └── middlewares/
│ ├── authMiddleware.test.ts
│ ├── errorMiddleware.test.ts
│ └── index.test.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
```
