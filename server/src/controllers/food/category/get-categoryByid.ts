import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await prisma.foodCategory.findFirst({
    where: {
      id: Number(id),
    },
  });

  res.json({ category });
};
