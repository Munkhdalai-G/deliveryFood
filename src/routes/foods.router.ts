import express, { Request, Response } from "express";
import { createFood } from "../controllers/food/foods/create-food";
import { updateFood } from "../controllers/food/foods/update-food";
import { deleteFood } from "../controllers/food/foods/delete-food";
import { getFoodById } from "../controllers/food/foods/get-foodById";
import { getFood } from "../controllers/food/foods/get-food";

const router = express.Router();

router.get("/", getFood);

router.get("/:id", getFoodById);

router.post("/", createFood);

router.put("/:id", updateFood);

router.delete("/:id", deleteFood);

export default router;
