import express, { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { createOrder } from "../controllers/food/order/create-order";
import { getOrder } from "../controllers/food/order/get-order";

const orderRouter = express.Router();

orderRouter.get("/", getOrder);

orderRouter.post("/", createOrder);

orderRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { totalPrice, status } = req.body;

  try {
    const foodOrder = await prisma.foodOrder.update({
      where: {
        id: Number(id),
      },
      data: {
        totalPrice,
        status,
      },
    });

    res.json({ foodOrder });
  } catch (error) {
    res.status(500).send(error);
  }
});

orderRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foodOrder = await prisma.foodOrder.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ message: "catergory deleted", foodOrder });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default orderRouter;
