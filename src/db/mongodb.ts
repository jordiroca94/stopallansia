import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log("Error connecting to Mongo DB:", error);
  }
};
