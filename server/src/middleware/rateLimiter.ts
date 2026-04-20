import type { Request, Response, NextFunction } from "express";
import ratelimit from "../config/upstash.js";

const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");
    if (!success) {
      res
        .status(429)
        .json({ message: "Too many requests, please try again later" });
      return;
    }

    next();
  } catch (error) {
    console.log("Rate Limit error", error);
    next(error);
  }
};

export default rateLimiter;
