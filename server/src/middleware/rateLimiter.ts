import type { Request, Response, NextFunction } from "express";
import ratelimit from "../config/upstash.js";

const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { success } = await ratelimit.limit(
      "userId when there is authentication, otherwise use IP address",
    );
    // ! TODO: Implement a more robust key generation strategy for authenticated users, because now it is just using a static string which will not differentiate between different users or IPs. Consider using req.ip for unauthenticated users and a unique identifier from the authentication token for authenticated users.
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
