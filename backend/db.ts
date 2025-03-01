import mongoose from "mongoose";

const mongoURI: string =
  "mongodb+srv://Anchal:2panwxxjCnw6ds_@cluster0.tccdl.mongodb.net/task-manager?retryWrites=true&w=majority";

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
