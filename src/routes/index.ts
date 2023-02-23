import { Router, Express } from "express";

import productRouter from "./product.route";

export function routerApi(app: Express) {
  // const router = Router();
  // app.use("/api/v1", router);

  app.use("/api/products", productRouter);
}
