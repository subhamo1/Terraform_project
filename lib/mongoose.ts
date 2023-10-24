import mongoose from "mongoose";

const isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  // this will prevent unknown field query
};
