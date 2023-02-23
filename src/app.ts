import express from "express";
import cors from "cors";
import * as amqp from "amqplib/callback_api";

import { RABBIT_URL } from "./config";
import { Product } from "./entities/product.entity";
import { create, update, remove } from "./services/product.services";

import { routerApi } from "./routes";
import { CreateProduct, UpdateProductDTO } from "./models/product.model";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5001",
      "http://localhost:5000",
      "http://localhost:4200",
    ],
  })
);

app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("hi there¡");
});

routerApi(app);

//rabbit connection
amqp.connect(RABBIT_URL, (err0, connection) => {
  if (err0) {
    throw err0;
  }

  connection.createChannel((err1, channel) => {
    if (err1) {
      throw err1;
    }

    channel.assertQueue("product_created", { durable: false });
    channel.assertQueue("product_updated", { durable: false });
    channel.assertQueue("product_removed", { durable: false });

    channel.consume(
      "product_created",
      async (msg) => {
        console.log(msg?.content.toString());

        const eventProduct: CreateProduct = JSON.parse(
          msg?.content.toString()!
        );
        const newProduct = new Product();

        newProduct.admin_id = parseInt(eventProduct.id);
        newProduct.title = eventProduct.title;
        newProduct.image = eventProduct.image;
        newProduct.likes = eventProduct.likes;

        await create(newProduct);
      },
      { noAck: true }
    );

    channel.consume(
      "product_updated",
      async (msg) => {
        console.log(msg?.content.toString());

        const eventProduct: UpdateProductDTO = JSON.parse(
          msg?.content.toString()!
        );
        const newProduct = new Product();

        newProduct.admin_id = parseInt(eventProduct.id);
        newProduct.title = eventProduct.title;
        newProduct.image = eventProduct.image;
        newProduct.likes = eventProduct.likes;

        await update(newProduct.admin_id, newProduct);
      },
      { noAck: true }
    );

    channel.consume(
      "product_removed",
      async (msg) => {
        console.log(msg?.content.toString());
        const admin_id = parseInt(msg?.content.toString()!);
        remove(admin_id);
      },
      { noAck: true }
    );

    process.on("beforeExit", () => {
      console.log("closing rabbit connection");
      connection.close();
    });
  });
});

export default app;
