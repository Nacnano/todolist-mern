import { IUser } from "../types/users";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: {
      type: [Schema.Types.ObjectId],
      ref: "Todos",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("Users", UserSchema, "users");
