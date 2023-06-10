import { Schema, model } from "mongoose";
import { IUser } from "../types/users";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: {
      type: [Schema.Types.ObjectId],
      ref: "todos",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("Users", UserSchema, "users");
