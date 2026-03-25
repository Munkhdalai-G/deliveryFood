import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export const createUser = async (req: Request, res: Response) => {
  const { email, password, age, phoneNumber } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        age,
        phoneNumber,
      },
    });

    res.json({ user });
  } catch (error) {
    res.send(error);
  }
};
