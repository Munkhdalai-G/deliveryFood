import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const createFood = async (req: Request, res: Response) => {
  const { name, price, foodCategoryId } = req.body;

  try {
    const food = await prisma.food.create({
      data: {
        name,
        price,
        foodCategoryId,
      },
    });

    res.json({ food });
  } catch (error) {
    res.send(error);
  }
};
