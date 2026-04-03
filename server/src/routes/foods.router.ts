import express from "express";
import { createFood } from "../controllers/food/foods/create-food";
import { updateFood } from "../controllers/food/foods/update-food";
import { deleteFood } from "../controllers/food/foods/delete-food";
import { getFoodById } from "../controllers/food/foods/get-foodById";
import { getFoods } from "../controllers/food/foods/get-food";

const foodsrouter = express.Router();

foodsrouter.get("/", getFoods);

foodsrouter.get("/:id", getFoodById);

foodsrouter.post("/", createFood);

foodsrouter.put("/:id", updateFood);

foodsrouter.delete("/:id", deleteFood);

export default foodsrouter;
