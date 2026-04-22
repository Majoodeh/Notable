import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
// Enable CORS in development mode only
if (process.env.NODE_ENV !== "production") {
  app.use(cors()); // Enable CORS for all routes
}
app.use(express.json()); // middlware tom parse JSON bodies
app.use(rateLimiter);

app.use((req: Request, res: Response, next: NextFunction): void => {
  console.log(`Req method is ${req.method}`);
  next();
});

app.use("/api/notes", notesRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/{*any}", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server run on PORT: ${PORT}`);
  });
});
