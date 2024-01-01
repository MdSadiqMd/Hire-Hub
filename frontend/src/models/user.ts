import { Schema, model, Document, models } from "mongoose";

export enum Designation {
  EMPLOYEE = "In Search of Job",
  MANAGER = "To Hire",
}

interface IUser extends Document {
  name: string;
  email: string;
  designation: Designation;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  designation: {
    type: String,
    enum: Object.values(Designation),
    required: true,
  },
});

export default models.User || model<IUser>("User", userSchema);