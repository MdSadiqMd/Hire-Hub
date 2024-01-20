import mongoose from "mongoose";

async function connectDB() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MongoDB connection URL is undefined.");
    }
    await mongoose.connect(mongoUrl, {
      dbName: "Hire-Hub",
    });
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
    });
    connection.on("error", (err) => {
      console.error("Error Occurred while connecting to MongoDB:", err);
    });
  } catch (err) {
    console.error("Error Connecting to MongoDB:", err);
    process.exit(1);
  }
}

export default connectDB;
