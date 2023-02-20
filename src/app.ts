import express from "express";
import cors from "cors";

// import { routerApi } from "./routes";

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

// routerApi(app);

export default app;
