import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

const corsOptions = {
  origin: ["http://127.0.0.1:5500"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(helmet());

app.get("/", (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  console.log(req.cookies.trip, req.cookies.country);

  res.send("Welcome!");
});

app.listen(8080);
