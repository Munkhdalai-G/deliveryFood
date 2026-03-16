import express, { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { createUser } from "../controllers/food/user/create-user";
import { deleteUser } from "../controllers/food/user/delete-user";
import { getUser } from "../controllers/food/user/get-user";
import { updateUser } from "../controllers/food/user/update-user";
import { getUserById } from "../controllers/food/user/get-userById";

const userRouter = express.Router();

userRouter.get("/users", getUser);

userRouter.get("/users/:id", getUserById);

userRouter.post("/users", createUser);

userRouter.put("/users/:id", updateUser);

userRouter.delete("/users/:id", deleteUser);

export default userRouter;
