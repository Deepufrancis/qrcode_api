import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "QR Code & Utility API",
        version: "1.0.0",
        description: "API for generating QR codes and related utilities",
      },
      servers: [{ url: "http://localhost:3000" }],
    },
    apis: ["./src/routes/**/*.ts"], // Adjust this path if routes are elsewhere
  };

  const specs = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
