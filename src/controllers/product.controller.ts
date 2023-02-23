import { Request, Response } from "express";
import axios from "axios";
const ObjectId = require("mongodb").ObjectId;

import { AppDataSource } from "../database/dataSource";
import { Product } from "../entities/product.entity";

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const repo = AppDataSource.getRepository(Product);
    const products = await repo.find();

    res.status(200).json({ count: products.length, data: products });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function increaseLikes(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    const repo = AppDataSource.getRepository(Product);
    const product = await repo.findOneBy({
      _id: new ObjectId(id),
    });

    if (!product) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    await axios.post(
      `http://localhost:5000/api/products/${product.admin_id}/likes`,
      {}
    );

    product.likes++;
    await repo.save(product);
    res.send(product);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send(error);
  }
}
