import BaseRoutes from "./base/BaseRouter";
import PostController from "../controller/PostController";
import validate from "../helper/validate";
import { createPostSchema, updatePostSchema } from "../schema/PostSchema";

class PostRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("", validate(createPostSchema), PostController.create);
    this.router.patch(
      "/:id",
      validate(updatePostSchema),
      PostController.update
    );
    this.router.delete("/:id", PostController.delete);
    this.router.get("", PostController.findAll);
    this.router.get("/:id", PostController.findById);
  }
}

export default new PostRoutes().router