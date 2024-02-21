import BaseRoutes from "./base/BaseRouter";
import UserController from "../controller/UserController";
import validate from "../helper/validate";
import { createUserSchema, updateUserSchema } from "../schema/UserSchema";

class PostRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/registration", validate(createUserSchema), UserController.create);
    this.router.patch(
      "/:id",
      validate(updateUserSchema),
      UserController.update
    );
    this.router.delete("/:id", UserController.delete);
    this.router.get("", UserController.findAll);
    this.router.get("/:id", UserController.findById);
  }
}

export default new PostRoutes().router