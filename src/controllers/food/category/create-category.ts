import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const createFood = async (req: Request, res: Response) => {
  const { name, price, category, foodCategoryId } = req.body;

  try {
    const food = await prisma.food.create({
      data: {
        name,
        price,
        category,
        foodCategoryId,
      },
    });

    res.json({ food });
  } catch (error) {
    res.send(error);
  }
};
