import mongoose from "mongoose";

export default async function connection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/hire-hub");
    console.log("connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}
