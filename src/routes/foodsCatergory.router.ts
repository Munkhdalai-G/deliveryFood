import express, { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const categoryRouter = express.Router();

categoryRouter.get("/", async (_req: Request, res: Response) => {
  const foodsCategory = await prisma.food.findMany();

  res.json({ foodsCategory });
});

categoryRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const foodCategory = await prisma.foodCategory.findFirst({
    where: {
      id: Number(id),
    },
  });

  res.json({ foodCategory });
});

categoryRouter.post("/", async (req: Request, res: Response) => {
  const { name, foods } = req.body;

  try {
    const foodCategory = await prisma.foodCategory.create({
      data: {
        name,
        foods,
      },
    });

    res.json({ foodCategory });
  } catch (error) {
    res.send(error);
  }
});

categoryRouter.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, foods } = req.body;

  try {
    const foodCategory = await prisma.foodCategory.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        foods,
      },
    });

    res.json({ foodCategory });
  } catch (error) {
    res.status(500).send(error);
  }
});

categoryRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foodCategory = await prisma.foodCategory.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ message: "catergory deleted", foodCategory });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default categoryRouter;
