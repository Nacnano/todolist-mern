import { useState } from "react";
import { ITodo } from "../types/types";
import React from "react";

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo) => void;
};

const initialFormState: ITodo = {
  _id: "",
  name: "",
  description: "",
  status: true,
  user: "guest",
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo>(initialFormState);
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      // TODO: add user
      // user: <username>
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    saveTodo(e, formData);
    setFormData(initialFormState);
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="name">Name (required)</label>
          <input
            onChange={handleForm}
            type="text"
            id="name"
            value={formData.name}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            onChange={handleForm}
            type="text"
            id="description"
            value={formData.description}
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline</label>
          <input onChange={handleForm} type="date" id="deadline" />
        </div>
      </div>
      <button disabled={formData.name ? false : true}>Add Todo</button>
    </form>
  );
};

export default AddTodo;
