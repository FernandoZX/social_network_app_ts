import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Post } from "./Post";

@Table({
  tableName: User.USER_TABLE_NAME,
})
export class User extends Model {
  public static USER_TABLE_NAME = "user" as string;
  public static USER_ID = "id" as string;
  public static USER_FULL_NAME = "full_name" as string;
  public static USER_AGE = "age" as string;
  public static USER_EMAIL = "email" as string;
  public static USER_PASSWORD = "password" as string;
  public static USER_CREATED_AT = "created_at" as string;
  public static USER_UPDATED_AT = "updated_at" as string;
  public static USER_DELETED_AT = "deleted_at" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: User.USER_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: User.USER_FULL_NAME,
  })
  full_name!: string;

  @Column({
    type: DataType.STRING(100),
    field: User.USER_EMAIL,
  })
  email!: string;

  @Column({
    type: DataType.STRING(100),
    field: User.USER_PASSWORD,
  })
  password!: string;

  @Column({
    type: DataType.INTEGER,
    field: User.USER_AGE,
  })
  age!: number;

  @Column({
    type: DataType.DATE,
    field: User.USER_DELETED_AT,
  })
  deleted_at!: Date;

  @HasMany(() => Post, 'postId')
  posts!: Post[]
}
