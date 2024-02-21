import BaseRoutes from "./base/BaseRouter";
import AuthController from "../controller/AuthController";
import { generateToken, clearToken } from "../helper/auth";

class AuthRouter extends BaseRoutes {
  public routes(): void {
    this.router.post("/login", AuthController.login);
    this.router.post("/logout", AuthController.logout);
  }
}

export default new AuthRouter().router