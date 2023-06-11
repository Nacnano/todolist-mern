import axios, { AxiosResponse } from "axios";
import { ITodo } from "../types/todo";
import { ApiDataType } from "../types/data";

// const apiUrl: string = process.env.API_URL || "http://localhost:3000";
const apiUrl = "http://localhost:3000";

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const data: AxiosResponse<ApiDataType> = await axios.get(apiUrl + "/todos");
    return data;
  } catch (error) {
    throw new Error("Error occurred while fetching todos");
  }
};

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, "_id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
      deadline: formData.deadline,
    };
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      apiUrl + "/add-todo",
      todo
    );
    return saveTodo;
  } catch (error) {
    throw new Error("Error occurred while saving the Todo");
  }
};

export const updateTodo = async (
  todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, "status"> = {
      status: !todo.status,
    };
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${apiUrl}/edit-todo/${todo._id}`,
      todoUpdate
    );
    return updatedTodo;
  } catch (error) {
    throw new Error("Error occurred while updating the Todo");
  }
};

export const deleteTodo = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${apiUrl}/delete-todo/${_id}`
    );
    return deletedTodo;
  } catch (error) {
    throw new Error("error occurred while deleting the Todo");
  }
};
