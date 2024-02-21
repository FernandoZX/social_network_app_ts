import { Request, Response } from "express";
import { User } from "../model/User";
import { UserRepo } from "../repository/UserRepo";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const new_user = new User();
      new_user.full_name = req.body.full_name;
      new_user.password = req.body.password;
      new_user.age = req.body.age;
      new_user.email = req.body.email;

      await new UserRepo().save(new_user);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created user!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      await new UserRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted user!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const new_user = await new UserRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched user by id!",
        data: new_user,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const new_user = await new UserRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all user data!",
        data: new_user,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      const new_user = new User();

      new_user.id = id;
      new_user.full_name = req.body.full_name;
      new_user.password = req.body.password;
      new_user.age = req.body.age;
      new_user.email = req.body.email;
      
      await new UserRepo().update(new_user);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated user data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new UserController()