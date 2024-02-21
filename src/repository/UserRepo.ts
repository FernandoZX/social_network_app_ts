import { User } from "../model/User";

interface IUserRepo {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(userId: number): Promise<void>;
  retrieveById(userId: number): Promise<User>;
  retrieveAll(): Promise<User[]>;
}

export class UserRepo implements IUserRepo {

  async save(user: User): Promise<void> {
    try {
      await User.create({
        full_name: user.full_name,
        age: user.age,
        password:user.password,
        email: user.email,
      });
    } catch (error) {
      throw new Error("Failed to create user!");
    }
  }
  async update(user: User): Promise<void> {
    try {
      const new_user = await User.findOne({
        where: {
          id: user.id,
          deleted_at: null
        },
      });
      if (!new_user) {
        throw new Error("User not found!");
      }
      new_user.full_name = user.full_name;
      new_user.age = user.age;
      new_user.email = user.email;
      new_user.password =user.password;

      await new_user.save();
    } catch (error) {
      throw new Error("Failed to update User!");
    }
  }
  async delete(userId: number): Promise<void> {
    try {
      const new_user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: userId,
          deleted_at: null
        },
      });
      if (!new_user) {
        throw new Error("User not found!");
      }

      new_user.deleted_at = new Date();

      await new_user.save();
    } catch (error) {
      throw new Error("Failed to destroy user!");
    }
  }
  async retrieveById(userId: number): Promise<User> {
    try {
      const new_user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: userId,
          deleted_at: null
        },
      });
      if (!new_user) {
        throw new Error("User not found!");
      }
      return new_user;
    } catch (error) {
      throw new Error("Failed to retrieve user!");
    }
  }
  async retrieveAll(): Promise<User[]> {
    try {
      return await User.findAll({
        attributes: { exclude: ['password'] },
        where: {
          deleted_at: null,
        }
      });
    } catch (error) {
      throw new Error("Failed to list posts!");
    }
  }
  
}