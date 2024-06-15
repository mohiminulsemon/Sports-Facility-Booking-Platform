import express, { Application, Request, Response } from "express";
import cors from "cors";
// import notFound from "./app/middlewares/notFound";
// import globalErrorHandler from "./app/middlewares/globalErrorHandler";
// import router from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

// app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Sports Facility Booking Platform server is up and running");
});

// app.use(notFound);

// app.use(globalErrorHandler);

export default app;
