import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { foodId, quantity } = req.body;

  try {
    const order = await prisma.foodOrderItem.update({
      where: {
        id: Number(id),
      },
      data: {
       foodId, quantity 
      },
    });

    res.json({ order });
  } catch (error) {
    res.status(500).send(error);
  }
};
