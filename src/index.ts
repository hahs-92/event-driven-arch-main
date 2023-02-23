import { AppDataSource } from "./database/dataSource";
import * as amqp from "amqplib/callback_api";

import app from "./app";
// import { RABBIT_URL } from "./config";
// import { create, update, remove } from "./services/product.services";
// import { Product } from "./entities/product.entity";

async function main() {
  try {
    await AppDataSource.initialize();

    // //rabbit connection
    // amqp.connect(RABBIT_URL, (err0, connection) => {
    //   if (err0) {
    //     throw err0;
    //   }

    //   connection.createChannel((err1, channel) => {
    //     if (err1) {
    //       throw err1;
    //     }

    //     channel.assertQueue("product_created", { durable: false });
    //     channel.assertQueue("product_updated", { durable: false });
    //     channel.assertQueue("product_removed", { durable: false });

    //     channel.consume(
    //       "product_created",
    //       async (msg) => {
    //         console.log(msg?.content.toString());

    //         const eventProduct: Product = JSON.parse(msg?.content.toString()!);
    //         const newProduct = new Product();

    //         newProduct.admin_id = parseInt(eventProduct.id);
    //         newProduct.title = eventProduct.title;
    //         newProduct.image = eventProduct.image;
    //         newProduct.likes = eventProduct.likes;

    //         await create(newProduct);
    //       },
    //       { noAck: true }
    //     );

    //     channel.consume(
    //       "product_updated",
    //       async (msg) => {
    //         console.log(msg?.content.toString());

    //         const eventProduct: Product = JSON.parse(msg?.content.toString()!);
    //         const newProduct = new Product();

    //         newProduct.admin_id = parseInt(eventProduct.id);
    //         newProduct.title = eventProduct.title;
    //         newProduct.image = eventProduct.image;
    //         newProduct.likes = eventProduct.likes;

    //         await update(newProduct.admin_id, newProduct);
    //       },
    //       { noAck: true }
    //     );

    //     channel.consume(
    //       "product_removed",
    //       async (msg) => {
    //         console.log(msg?.content.toString());
    //         const admin_id = parseInt(msg?.content.toString()!);
    //         remove(admin_id);
    //       },
    //       { noAck: true }
    //     );

    //     app.listen(5001, () => {
    //       console.log("server listening...");
    //     });

    //     process.on("beforeExit", () => {
    //       console.log("closing rabbit connection");
    //       connection.close();
    //     });
    //   });
    // });

    app.listen(5001, () => {
      console.log("server listening...");
    });
  } catch (error) {
    console.error(error);
  }
}

main();
