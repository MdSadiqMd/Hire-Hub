import mongoose, { Document, Schema } from "mongoose";
import bycrypt from 'bcryptjs';

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

// middleware
userSchema.pre("save", async function(next) {
  const user = this as UserInterface; 
  if (user.isModified("password")) {
    user.password = await bycrypt.hash(user.password, 10);
  }
  next();
});
userSchema.methods.comparePassword = async function (string_pass:string) {
  const isMatch:boolean=await bycrypt.compare(string_pass,this.password);
  return isMatch;
}
userSchema.methods.updatePassword = async function (string_pass:string) {
  const password:string=await bycrypt.hash(string_pass,10);
  return password;
}

const User = mongoose.models.User || mongoose.model<UserInterface>("User", userSchema);

export default User;
