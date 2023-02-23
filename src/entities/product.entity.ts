import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm";

@Entity({ name: "products" })
export class Product {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ unique: true })
  admin_id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column({ default: 0 })
  likes: number;
}
