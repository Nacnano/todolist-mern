import { Document } from "mongoose";

export interface ITodo extends Document {
  name: string;
  description?: string;
  status: boolean;
  deadline?: Date;
  user: string;
  createdAt?: string;
  updatedAt?: string;
}
