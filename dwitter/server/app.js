import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dweetsRouter from "./router/dweets.js";
import authRouter from "./router/auth.js";
import "express-async-errors";
import { config } from "./config.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/dweets", dweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((err, req, res, next) => {
  console.log(err);

  res.sendStatus(500);
});

app.listen(config.host.port);
