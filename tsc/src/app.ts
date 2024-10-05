import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";

import tweetsRouter from "./router/tweets";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
  });
});

app.listen(8080, () => {
  console.log("Server is running...");
});
