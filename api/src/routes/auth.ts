import { Router } from "express";
import { getMe, getUser, login } from "../controllers/auth";
import auth from "../middlewares/auth";
import { check } from "express-validator";

const router: Router = Router();

router.get("/auth/:username", getUser);

router.get("/auth/", auth, getMe);

router.post("/auth/", [
  check(
    "username",
    "Please provide a minimum 5 characters, space-free username"
  )
    .isLength({
      min: 5,
    })
    .custom((value) => !/\s/.test(value)),
  check(
    "password",
    "Password must be a minimum of 6 characters and valid"
  ).exists(),
  login,
]);

export default router;
