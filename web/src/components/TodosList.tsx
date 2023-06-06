import React from "react";
import { deleteTodo, updateTodo } from "../utils/todoActions";
import Todo from "./Todo";
import { ITodo } from "../types/types";

type Props = {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const TodosList: React.FC<Props> = ({ todos, setTodos }) => {
  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error occurred while updating the Todo");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {todos.map((todo: ITodo) => (
        <Todo
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </>
  );
};

export default TodosList;
