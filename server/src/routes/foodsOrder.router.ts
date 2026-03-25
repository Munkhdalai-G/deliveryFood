import express from "express";
import { createOrder } from "../controllers/food/order/create-order";
import { getOrder } from "../controllers/food/order/get-order";
import { updateOrder } from "../controllers/food/order/update-order";
import { deleteOrder } from "../controllers/food/order/delete-order";
import { getOrderById } from "../controllers/food/order/get-orderById";
import { authMiddleware } from "../middleware/auth-middleware/auth-middleware";
import { adminMiddleware } from "../middleware/auth-middleware/admin-middleware";

const orderRouter = express.Router();

orderRouter.get("/", authMiddleware, adminMiddleware, getOrder);

orderRouter.get("/:id", getOrderById);

orderRouter.post("/", authMiddleware, createOrder);

orderRouter.put("/:id", updateOrder);

orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
