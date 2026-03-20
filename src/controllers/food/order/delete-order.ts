import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
     const orderDelete =await prisma.foodOrder.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ message: "Order deleted", orderDelete });
  } catch (error) {
    res.status(500).send(error);
  }
};
