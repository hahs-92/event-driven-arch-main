import { AppDataSource } from "./database/dataSource";
import * as amqp from "amqplib/callback_api";

import app from "./app";
import { RABBIT_URL } from "./config";

async function main() {
  try {
    await AppDataSource.initialize();
    //rabbit connection
    amqp.connect(RABBIT_URL, (err0, connection) => {
      if (err0) {
        throw err0;
      }

      connection.createChannel((err1, channel) => {
        if (err1) {
          throw err1;
        }
        app.listen(5001, () => {
          console.log("server listening...");
        });
      });
    });
  } catch (error) {
    console.error(error);
  }
}

main();
