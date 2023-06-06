import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes";
dotenv.config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(todoRoutes);

const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/mern-todo";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(uri as string, options as ConnectOptions)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    throw error;
  });
