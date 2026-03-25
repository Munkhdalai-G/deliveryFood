import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const getOrder = async (_req: Request, res: Response) => {
  const orders = await prisma.foodOrder.findMany({
    include: {
      foodOrderItems: {
        include: {
          food: true,
        },
      },
    },
  });

  res.json({ orders });
};
