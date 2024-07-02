import express from "express";
import { envs } from "./config/envs";
import { appRoutes } from "./routes";
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

    this.app.use(appRoutes);

    this.app.listen(envs.PORT, () => {
      console.log(`Server running on port ${envs.PORT}`);
    });
  }
}
