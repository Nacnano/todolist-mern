import { ITodo } from "./todo";

export type ApiDataType = {
  message: string;
  status: string;
  todos: ITodo[];
};
