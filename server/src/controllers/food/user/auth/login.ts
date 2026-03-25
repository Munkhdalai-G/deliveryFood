import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/prisma";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return res.status(404).json({ message: "user not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const accessToken = jwt.sign(
      {
        data: {
          userId: user.id,
          email: user.email,
          role: "user",
        },
      },
      "secret",
      { expiresIn: "1h" },
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(400).json({ message: "invalid credentials" });
  }
};
