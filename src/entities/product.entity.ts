import { Entity, Column } from "typeorm";
import { ObjectIdColumn } from "typeorm/decorator/columns/ObjectIdColumn";

@Entity({ name: "products" })
export class Product {
  @ObjectIdColumn()
  id: number;

  @Column({ unique: true })
  admin_id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column({ default: 0 })
  likes: number;
}
