import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(`Mongodb is connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("error connection to MONGODB", error);
    process.exit(1); // Stop the server if the DB fails
  }
};
