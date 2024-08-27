import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dweetsRouter from "./router/dweets.js";
import "express-async-errors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/dweets", dweetsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((err, req, res, next) => {
  console.log(err);

  res.sendStatus(500);
});

app.listen(8080);
