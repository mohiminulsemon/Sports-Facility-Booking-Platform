import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

// const userSchema = new Schema<TUser>(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: true },
//     role: { type: String, enum: ["admin", "user"], required: true },
//     address: { type: String, required: true },
//   },
// );

// export const User = model<TUser>("User", userSchema);

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    role: { type: String, enum: ["admin", "user"], default: "user", required: false },
    address: { type: String, required: false },
  },
  { timestamps: true }
);

export const User = model<TUser>("User", userSchema);

