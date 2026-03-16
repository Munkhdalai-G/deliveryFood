import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password, age, phoneNumber } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
        password,
        age,
        phoneNumber,
      },
    });

    res.json({ user });
  } catch (error) {
    res.status(500).send(error);
  }
};
