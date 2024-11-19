import express from "express";
import cors from "cors";
import pino from "pino";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { PORT } from "./utils/env.js";
import contactsRoutes from "./routes/contactsRoutes.js";

const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
  },
});

export const setupServer = async () => {
  await initMongoConnection();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/contacts", contactsRoutes);

  app.use((req, res, next) => {
    res.status(404).json({
      message: "Not found",
    });
  });

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};
