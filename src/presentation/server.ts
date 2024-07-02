import express from "express";
import { envs } from "../config/envs";
import { authRoutes } from "../routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";

export class Server {
  private readonly app = express();

  async start() {
    //Middlewares
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(authRoutes);

    this.app.listen(envs.PORT, () => {
      console.log("other app 2");
      console.log(`Server running on port ${envs.PORT}`);
    });
  }
}
