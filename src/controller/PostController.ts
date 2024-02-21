import { Request, Response } from "express";
import { Post } from "../model/Post";
import { PostRepo } from "../repository/PostRepo";

class PostController {
  async create(req: Request, res: Response) {
    try {
      const new_post = new Post();
      new_post.title = req.body.title;
      new_post.content = req.body.content;

      await new PostRepo().save(new_post);

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

  async delete(req: Request, res: Response) {
    try {
      let id = parseInt(req.params["id"]);
      await new PostRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted post!",
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
      const new_post = await new PostRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched post by id!",
        data: new_post,
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
      const new_post = await new PostRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all post data!",
        data: new_post,
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
      const new_post = new Post();

      new_post.id = id;
      new_post.title = req.body.title;
      new_post.content = req.body.content;
      
      await new PostRepo().update(new_post);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated post data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new PostController()