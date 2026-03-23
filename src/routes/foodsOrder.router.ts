import express from "express";
import { createOrder } from "../controllers/food/order/create-order";
import { getOrder } from "../controllers/food/order/get-order";
import { updateOrder } from "../controllers/food/order/update-order";
import { deleteOrder } from "../controllers/food/order/delete-order";
import { getOrderById } from "../controllers/food/order/get-orderByid";

const orderRouter = express.Router();

orderRouter.get("/", getOrder);

orderRouter.get("/:id", getOrderById);

orderRouter.post("/", createOrder);

orderRouter.put("/:id", updateOrder);

orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
