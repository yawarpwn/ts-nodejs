import express, { Router } from "express";
import { appRoutes } from "../routes";
import { authRoutes } from "../routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  private readonly app = express();

  async start() {
    //Middlewares
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(authRoutes);

    this.app.listen(PORT, () => {
      console.log("other app 2");
      console.log(`Server running on port ${PORT}`);
    });
  }
}
