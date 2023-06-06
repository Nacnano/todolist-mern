import "./App.css";
import { useEffect, useState } from "react";
import TodosList from "./components/TodosList";
import { addTodo, getTodos } from "./utils/todoActions";
import AddTodo from "./components/AddTodo";
import { ITodo } from "./types/types";
import React from "react";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = (): void => {
    getTodos()
      .then(({ data: todos }: ITodo[] | any) => setTodos(todos))
      .catch((error: Error) => {
        throw error;
      });
  };

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error occured while saving the Todo");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="app">
      <h1> Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      <TodosList todos={todos} setTodos={setTodos} />
    </main>
  );
};

export default App;
