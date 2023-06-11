export interface ITodo {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  deadline?: Date;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TodoProps = {
  todo: ITodo;
};

export type TodosListProps = {
  todos: ITodo[];
};
