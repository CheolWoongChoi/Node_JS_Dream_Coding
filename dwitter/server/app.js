import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import yaml from "yamljs";
import swaggerUI from "swagger-ui-express";
import * as OpenAPIValidator from "express-openapi-validator";

import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { sequelize } from "./db/database.js";
import { csrfCheck } from "./middleware/csrf.js";
import rateLimiter from "./middleware/rate-limiter.js";
import * as apiControllers from "./controller/index.js";
import { authHandler } from "./middleware/auth.js";

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
  credentials: true, // allow the Access-Control-Allow-Credentials
};
const openAPIDocument = yaml.load("./api/openapi.yaml");

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));
app.use(rateLimiter);

app.use(csrfCheck);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openAPIDocument));
app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

/**
 * openAPI에 정의한 내용을 토대로,
 * 라우팅 + validation
 */
app.use(
  OpenAPIValidator.middleware({
    apiSpec: "./api/openapi.yaml",
    validateResponses: true,
    operationHandlers: {
      resolver: modulePathResolver,
    },
    validateSecurity: {
      handlers: {
        jwt_auth: authHandler,
      },
    },
  })
);

function modulePathResolver(_, route, apiDoc) {
  const pathKey = route.openApiRoute.substring(route.basePath.length);
  const operation = apiDoc.paths[pathKey][route.method.toLowerCase()];
  const methodName = operation.operationId;

  /**
   * 나는 컨트롤러 별로 API들을 객체 안에 관리하고 있다.
   * 그래서 컨트롤러 내부의 API들을 하나로 묶어줄 필요가 있음.
   */
  const apis = {};

  Object.keys(apiControllers).forEach((key) => {
    Object.assign(apis, apiControllers[key]);
  });

  return apis[methodName];
}

app.use((req, res, next) => {
  res.sendStatus(404);
});

/**
 * 모든 에러에 대해 대응
 * openapi validate 실패 에러도 대응
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
  });
});

sequelize.sync().then(() => {
  const server = app.listen(config.host.port);
  initSocket(server);
});
