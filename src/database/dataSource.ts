import { DataSource } from "typeorm";
import { Product } from "../entities/product.entity";
import { MONGODB_URI } from "../config";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: MONGODB_URI,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  logging: false,
  synchronize: true,
  entities: [Product],
});
