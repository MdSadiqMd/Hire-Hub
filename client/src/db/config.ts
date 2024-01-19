import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "Hire-Hub",
    });

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
      resolve();
    });

    connection.on("error", (err) => {
      console.error("Error Occurred while connecting to MongoDB:", err);
      reject(err);
    });
  } catch (err) {
    console.error("Error Connecting to MongoDB:", err);
    process.exit(1);
  }
}

export default connectDB;
