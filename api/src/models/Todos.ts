import { ITodo } from "../types/todo";
import { model, Schema } from "mongoose";

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
    deadline: {
      type: Date,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
  },
  { timestamps: true }
);

export default model<ITodo>("Todos", todoSchema, "todos");
