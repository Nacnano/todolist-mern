import "./App.css";
import { useEffect, useState } from "react";
import { addTodo, deleteTodo, getTodos, updateTodo } from "./utils/todoActions";
import AddTodo from "./components/AddTodo";
import { ITodo } from "./types/types";
import React from "react";
import Todo from "./components/Todo";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((error: Error) => {
        throw error;
      });
  };

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error occurred while saving the Todo");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

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

  const toggleTheme = (): void => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <main className={`app ${theme}`}>
      <h1> Todos </h1>
      <button onClick={toggleTheme}>Toggle Theme</button>{" "}
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <Todo
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  );
};

export default App;
