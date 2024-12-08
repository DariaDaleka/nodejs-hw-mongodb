import express from "express";
import cors from "cors";
import pino from "pino";
import cookieParser from 'cookie-parser';
import { PORT } from "./utils/env.js";
import router from './routers/index.js';
import  errorHandler  from "./middlewares/errorHandler.js";
import  notFoundHandler  from "./middlewares/notFoundHandler.js";

const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
  },
});

export const setupServer = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};
