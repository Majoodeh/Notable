import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // middlware tom parse JSON bodies
app.use(rateLimiter);

app.use((req: Request, res: Response, next: NextFunction): void => {
  console.log(`Req method is ${req.method}`);
  next();
});

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server run on PORT: ${PORT}`);
  });
});
