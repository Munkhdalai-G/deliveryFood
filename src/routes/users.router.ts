import express, { Request, Response } from "express";
import { createUser } from "../controllers/food/user/create-user";
import { deleteUser } from "../controllers/food/user/delete-user";
import { getUser } from "../controllers/food/user/get-user";
import { updateUser } from "../controllers/food/user/update-user";
import { getUserById } from "../controllers/food/user/get-userById";

const userRouter = express.Router();

userRouter.get("/", getUser);

userRouter.get("/:id", getUserById);

userRouter.post("/", createUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
