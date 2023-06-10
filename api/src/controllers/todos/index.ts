import { Response, Request } from "express";
import { ITodo } from "./../../types/todo";
import TodosModel from "../../models/Todos";
import UsersModel from "../../models/Users";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await TodosModel.find().populate("user");
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, status, deadline, userId } = req.body;
    const user = userId ? userId : "6484abc450c867a4d5607171";
    const todo: ITodo = new TodosModel({
      name,
      description,
      status,
      deadline,
      user,
    });

    const newTodo: ITodo = await todo.save();
    await UsersModel.findByIdAndUpdate(user, {
      $push: { todos: newTodo._id },
    });
    const allTodos: ITodo[] = await TodosModel.find().populate("user");

    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await TodosModel.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allTodos: ITodo[] = await TodosModel.find().populate("user");
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await TodosModel.findByIdAndRemove(
      req.params.id
    );
    const allTodos: ITodo[] = await TodosModel.find().populate("user");
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
