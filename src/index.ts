import { AppDataSource } from "./database/dataSource";
import app from "./app";

async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(5001, () => {
      console.log("server listening...");
    });
  } catch (error) {
    console.error(error);
  }
}

main();
