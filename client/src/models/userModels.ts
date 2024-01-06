import mongoose from "mongoose";

interface userInterface {
  name: string;
  email: string;
  password: string;
}

const schema = new mongoose.Schema<userInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value: any) => value > 6,
      message: "value must be greater than 6",
    },
  },
});

const User =
  mongoose.models.user || mongoose.model<userInterface>("user", schema);

export default User;
