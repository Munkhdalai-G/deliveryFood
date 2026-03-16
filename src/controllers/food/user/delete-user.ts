import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ message: "User deleted", user });
  } catch (error) {
    res.status(500).send(error);
  }
};
