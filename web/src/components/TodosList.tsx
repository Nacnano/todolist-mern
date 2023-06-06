import React, { useState } from "react";
import { deleteTodo, updateTodo } from "../utils/todoActions";
import Todo from "./Todo";

type TodosListProps = {ITodo[]};

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error occured while updating the Todo");
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

const TodosList: React.FC<TodosListProps> = ({ todos }) => {
    return (todos.map((todo: ITodo) => {
        <Todo  key={todo._id}
        updateTodo={handleUpdateTodo}
        deleteTodo={handleDeleteTodo}
        todo={todo}/>
    }));
};

export default TodosList;
