import { Request, Response } from "express";
import { User } from "../model/User";
import { UserRepo } from "../repository/UserRepo";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const new_user = new User();
      new_user.email = req.body.email;
      new_user.password = req.body.password;

      await new UserRepo().save(new_user);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created post!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const new_user = new User();
      new_user.email = req.body.email;
      new_user.password = req.body.password;

      await new UserRepo().save(new_user);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created post!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

}

export default new AuthController()