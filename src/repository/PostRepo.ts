import { Post } from "../model/Post";

interface IPostRepo {
  save(post: Post): Promise<void>;
  update(post: Post): Promise<void>;
  delete(postId: number): Promise<void>;
  retrieveById(postId: number): Promise<Post>;
  retrieveAll(): Promise<Post[]>;
}

export class PostRepo implements IPostRepo {

  async save(post: Post): Promise<void> {
    try {
      await Post.create({
        title: post.title,
        content: post.content,
      });
    } catch (error) {
      throw new Error("Failed to create post!");
    }
  }
  async update(post: Post): Promise<void> {
    try {
      const new_post = await Post.findOne({
        attributes: { exclude: ['deleted_at'] },
        where: {
          id: post.id,
          deleted_at: null
        },
      });
      if (!new_post) {
        throw new Error("Post not found!");
      }
      new_post.title = post.title;
      new_post.content = post.content;

      await new_post.save();
    } catch (error) {
      throw new Error("Failed to update post!");
    }
  }
  async delete(postId: number): Promise<void> {
    try {
      const new_post = await Post.findOne({
        attributes: { exclude: ['deleted_at'] },
        where: {
          id: postId,
          deleted_at: null
        },
      });
      if (!new_post) {
        throw new Error("Post not found!");
      }

      await new_post.destroy();
    } catch (error) {
      throw new Error("Failed to destroy post!");
    }
  }
  async retrieveById(postId: number): Promise<Post> {
    try {
      const new_post = await Post.findOne({
        attributes: { exclude: ['deleted_at'] },
        where: {
          id: postId,
          deleted_at: null
        },
      });
      if (!new_post) {
        throw new Error("Post not found!");
      }
      return new_post;
    } catch (error) {
      throw new Error("Failed to retrieve post!");
    }
  }
  async retrieveAll(): Promise<Post[]> {
    try {
      return await Post.findAll({
        attributes: { exclude: ['deleted_at'] },
        where: {
          deleted_at: null
        }
      });
    } catch (error) {
      throw new Error("Failed to list posts!");
    }
  }
  
}