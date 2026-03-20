import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const getCategories = async (_req: Request, res: Response) => {
  const category = await prisma.foodCategory.findMany();

  res.json({ category });
};
