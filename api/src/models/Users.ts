import { Schema, model } from "mongoose";
import { IUser } from "../types/users";

// Register the Todo model in mongoose
require("./todo.model");

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
      ref: "Todo",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("Users", UserSchema, "users");
