import { Schema, model, Document, models } from "mongoose";

enum Designation {
  EMPLOYEE = 'In Search of Job',
  MANAGER = 'To Hire'
}

interface IUser extends Document {
  name: string;
  email: string;
  designation: Designation;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  designation: { type: String, enum: Object.values(Designation), required: true }
});

const UserModel = models.User || model<IUser>('User', userSchema);

export default UserModel;
