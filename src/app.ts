import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import routes from "./app/routes";
export const app: Application = express();

app.use(express.json());
app.use(cors());
const test = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.use("/api/v1", routes);
app.get("/", test);

app.use(globalErrorHandler);

app.use(notFound);
