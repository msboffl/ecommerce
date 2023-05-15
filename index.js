import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { dbConnect } from "./config/dbConnect.js";
import { errorHandler, notFound } from "./middlewares/notFound.js";
import authRouter from "./routes/authRoute.js";

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/users", authRouter);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello..!!");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server Running on http://${HOSTNAME}:${PORT}`);
});
