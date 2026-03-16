import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const updateFood = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, category, foodCategoryId } = req.body;

  try {
    const food = await prisma.food.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price,
        category,
        foodCategoryId,
      },
    });

    res.json({ food });
  } catch (error) {
    res.status(500).send(error);
  }
};
