import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updated = await prisma.foodCategory.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });

    res.json({ updated });
  } catch (error) {
    res.status(500).send(error);
  }
};
