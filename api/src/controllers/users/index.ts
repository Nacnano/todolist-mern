import { Response, Request } from "express";
import { IUser } from "../../types/user";
import UserModel from "../../models/Users";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await UserModel.find();
    res.status(200).json({ users });
  } catch (error) {
    throw error;
  }
};

const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, "username" | "password">;

    const user: IUser = new UserModel({
      name: body.username,
      email: body.password,
    });

    const newUser: IUser = await user.save();
    const allUsers: IUser[] = await UserModel.find();

    res
      .status(201)
      .json({ message: "User added", user: newUser, users: allUsers });
  } catch (error) {
    throw error;
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allUsers: IUser[] = await UserModel.find();
    res.status(200).json({
      message: "User updated",
      user: updatedUser,
      users: allUsers,
    });
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await UserModel.findByIdAndRemove(
      req.params.id
    );
    const allUsers: IUser[] = await UserModel.find();
    res.status(200).json({
      message: "User deleted",
      user: deletedUser,
      users: allUsers,
    });
  } catch (error) {
    throw error;
  }
};

export { getUsers, addUser, updateUser, deleteUser };
