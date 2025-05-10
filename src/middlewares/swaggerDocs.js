import swaggerUI from "swagger-ui-express";
import fs from "fs";

import createHttpError from "http-errors";
import { SWAGGER_PATH } from "../constants/constants.js";

export const swaggerDocs = (app) => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH, "utf-8"));

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
    console.log("Swagger documentation connected at /api-docs");
  } catch (error) {
    console.error("Error loading Swagger docs:", error.message);
    throw createHttpError(500, "Can't load Swagger docs");
  }
};
