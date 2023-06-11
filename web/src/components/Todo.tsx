import React from "react";
import { ITodo, TodoProps } from "../types/types";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  return (
    <div className="Card rounded-lg p-4 shadow-md flex justify-between items-center">
      <div className="Card--text">
        <h1 className={`text-xl font-bold ${checkTodo}`}>{todo.name}</h1>
        <p className={`mb-2 ${checkTodo}`}>{todo.description}</p>
        <p className={`text-sm ${checkTodo}`}>
          Due: {todo.deadline ? todo.deadline.toString() : "None"}
        </p>
      </div>
      <div className="Card--button">
        <button
          onClick={() => updateTodo(todo)}
          className={todo.status ? `hide-button` : "Card--button__done"}
        >
          Complete
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
