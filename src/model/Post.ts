import { Model, Table, Column, DataType, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: Post.POST_TABLE_NAME,
})
export class Post extends Model {
  public static POST_TABLE_NAME = "post" as string;
  public static POST_ID = "id" as string;
  public static POST_TITLE = "title" as string;
  public static POST_CONTENT = "content" as string;
  public static POST_DELETED_AT = "deleted_at" as string;


  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Post.POST_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: Post.POST_TITLE,
  })
  title!: string;

  @Column({
    type: DataType.STRING(255),
    field: Post.POST_CONTENT,
  })
  content!: string;

  @Column({
    type: DataType.DATE,
    field: Post.POST_DELETED_AT,
  })
  deleted_at!: Date;

  @BelongsTo(() => User, 'userId')
  user!: User;
}