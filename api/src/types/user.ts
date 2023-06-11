import { Document } from "mongoose";
import { ITodo } from "./todo";

export interface IUser extends Document {
  username: string;
  password: string;
  todos: string[];
}
