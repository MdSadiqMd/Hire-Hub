import mongoose, { Document, Schema } from "mongoose";

interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

const userSchema = new Schema<UserInterface>({
  username: {
    type: String,
    required: [true, "Please Provide a Username"],
  },
  email: {
    type: String,
    required: [true, "Please Provide an Email"],
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password"],
    validate: {
      validator: (value: any) => value.length > 6,
      message: "Password must be greater than 6 characters",
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User =
  mongoose.models.user || mongoose.model<UserInterface>("user", userSchema);

export default User;
