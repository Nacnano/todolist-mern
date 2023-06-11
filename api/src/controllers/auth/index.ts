import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import auth from "../../middlewares/auth";
import User from "../../models/Users";

const router = Router();

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );

    if (!user) {
      res.json({ exist: false });
    } else {
      res.json({ exist: true });
    }
  } catch (err) {
    res.status(500).json({ error: [{ msg: "Server Error" }] });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user!.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: [{ msg: "Server Error" }] });
  }
};

const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        error: [{ msg: "Invalid Credential" }],
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        error: [{ msg: "Invalid Credential" }],
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET!, (error, token) => {
      if (error) throw error;
      res.send({ token });
    });
  } catch (err) {
    res.status(500).json({ error: [{ msg: "Server Error" }] });
  }
};

export { getUser, getMe, login };
