import mongoose from "mongoose";

export default async function connection() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}
