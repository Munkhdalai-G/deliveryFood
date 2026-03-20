import express from "express";
import { updateCategory } from "../controllers/food/category/update-category";
import { deleteCategory } from "../controllers/food/category/delete-category";
import { createCategory } from "../controllers/food/category/create-category";
import { getCategoryById } from "../controllers/food/category/get-categoryByid";
import { getCategories } from "../controllers/food/category/get-category.";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);

categoryRouter.get("/:id", getCategoryById);

categoryRouter.post("/", createCategory);

categoryRouter.put("/:id", updateCategory);

categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
