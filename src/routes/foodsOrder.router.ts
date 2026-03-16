import express, { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const orderRouter = express.Router();

orderRouter.get("/", async (_req: Request, res: Response) => {
  const foodsOrder = await prisma.food.findMany();

  res.json({ foodsOrder });
});

orderRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const foodOrder = await prisma.foodOrder.findFirst({
    where: {
      id: Number(id),
    },
  });

  res.json({ foodOrder });
});

orderRouter.post("/", async (req: Request, res: Response) => {
  const { totalPrice, status } = req.body;

  try {
    const foodOrder = await prisma.foodOrder.create({
      data: {
        totalPrice,
        status,
      },
    });

    res.json({ foodOrder });
  } catch (error) {
    res.send(error);
  }
});

orderRouter.patch("/:id", async (req: Request, res: Response) => {
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
