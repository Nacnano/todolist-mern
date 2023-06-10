import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users";

const router: Router = Router();

router.get("/todos", getTodos);
router.post("/add-todo", addTodo);
router.put("/edit-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

router.get("/users", getUsers);
router.post("/add-user", addUser);
router.put("/edit-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);

export default router;
