import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const deleteOrder = async (req: Request, res: Response) => {
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
};
