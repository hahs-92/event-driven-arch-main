import { config } from "dotenv";

config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017";

export const RABBIT_URL = process.env.RABBIT_URL || "";
