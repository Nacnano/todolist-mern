import React from "react";
import { ITodo, TodoProps } from "../types/types";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={`text-xl font-bold ${checkTodo}`}>{todo.name}</h1>
        <p className={`mb-2 ${checkTodo}`}>{todo.description}</p>
        <p className={`text-sm ${checkTodo}`}>
          Due:{" "}
          {todo.deadline !== undefined
            ? new Date(todo.deadline).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "None"}
        </p>
      </div>
      <div className="Card--button">
        <button
          onClick={() => updateTodo(todo)}
          className={todo.status ? "Card--button__doing" : "Card--button__done"}
        >
          {todo.status ? "Still Doing?" : "Complete?"}
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
