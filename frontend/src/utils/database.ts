import mongoose from "mongoose";

let isConnected: boolean = false;

const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongo DB is already connected");
    return;
  } else {
    try {
      await mongoose.connect("mongodb://localhost:27017/Hire-Hub");
      isConnected = true;
      console.log("MongoDB connected");
    } catch (error) {
      console.log(error);
    }
  }
};

export default connectToDB;
