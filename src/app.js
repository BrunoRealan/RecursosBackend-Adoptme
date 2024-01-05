import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import __dirname from "./utils/index.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;
const connection = mongoose.connect(MONGO_URL);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentazao",
      description: "Documentación",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
