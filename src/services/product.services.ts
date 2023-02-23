import { AppDataSource } from "../database/dataSource";
import { Product } from "../entities/product.entity";

export async function create(newProduct: Product) {
  //try-catch
  const repo = AppDataSource.getRepository(Product);
  await repo.save(newProduct);
  console.log("product created");
}

export async function update(id: number, newProduct: Product) {
  //try-catch
  const repo = AppDataSource.getRepository(Product);
  let product = await repo.findOne({ where: { admin_id: id } });

  if (product) {
    product = { ...product, ...newProduct } as Product;
    await repo.save(product);
    console.log("product updated");
  }
}

export async function remove(id: number) {
  //try-catch
  const repo = AppDataSource.getRepository(Product);
  const product = await repo.findOne({ where: { admin_id: id } });

  if (product) {
    await repo.remove(product);
    console.log("product removed");
  }
}
