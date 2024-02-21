import express, { Application, Request, Response } from "express";
import session from "express-session";
import IORedis from 'ioredis';
import RedisStore from "connect-redis";
import Database from "./config/database";
import UserRouter from "./router/UserRouter";
import PostRouter from "./router/PostRouter";

const redisClient = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379");

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home");
    });
    this.app.use("/api/v1/users", UserRouter);
    this.app.use("/api/v1/posts", PostRouter);
    this.app.get('*', (req: Request, res: Response) => {
      console.log(req)
      res.send('404 Page Not Found');
    });
  }

} 

const port: number = 5000;
const app = new App().app;
console.log(app);
app.listen(port, () => {
  console.log("✅ Server started successfully!");
});