import mongoose from "mongoose";

const mongoURI: string = "mongodb://127.0.0.1:27017/task-manager";

const connectToMongo = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToMongo;
