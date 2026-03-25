import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const deleteFood = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const food = await prisma.food.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ message: "food deleted", food });
  } catch (error) {
    res.status(500).send(error);
  }
};
