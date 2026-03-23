import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const createFood = async (req: Request, res: Response) => {
  const { name, price, foodCategoryId ,image,ingredients} = req.body;

  try {
    const food = await prisma.food.create({
      data: {
        name,
        price,
        image,
        ingredients,
        foodCategoryId,
      },
    });

    res.json({ food });
  } catch (error) {
    res.send(error);
  }
};
