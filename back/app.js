import express from "express";
import {connectDB} from "./configs/db.js";
import cors from "cors";
import subscriberRoutes from "./routes/subscriberRoute.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  });
app.use("/api/subscriber", subscriberRoutes);

export default  app;
