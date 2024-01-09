import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      dbName: "Hire-Hub",
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
    });

    connection.on("error", (err) => {
      console.error("Error Occurred while connecting to MongoDB:", err);
      process.exit(1);
    });
  } catch (err) {
    console.error("Error Connecting to MongoDB:", err);
    process.exit(1);
  }
}
