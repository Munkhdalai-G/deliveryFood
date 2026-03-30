import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

type OrderItem = {
  foodId: number;
  quantity: number;
};

type Body = {
  orderItems: OrderItem[];
};

export const createOrder = async (req: Request, res: Response) => {
  const headers = req.headers;
  console.log("headers:", headers);
  return res.send("ok");
  const { orderItems }: Body = req.body;
  try {
    const foodIds = orderItems.map((item) => item.foodId);

    const foods = await prisma.food.findMany({
      where: {
        id: {
          in: foodIds,
        },
      },
    });

    const priceWithQuantity = foods.map((food) => {
      const foundedFood = orderItems.find((item) => item.foodId === food.id);
      if (!foundedFood) throw new Error("Not found");
      return { ...food, quantity: foundedFood.quantity };
    });

    const totalPrice = priceWithQuantity
      .reduce((acc, curr) => {
        return acc + Number(curr.price) * curr.quantity;
      }, 0)
      .toString();

    const order = await prisma.foodOrder.create({
      data: {
        totalPrice,
      },
    });

    const orderItemsWithId = orderItems.map((item) => ({
      ...item,
      foodOrderId: order.id,
    }));

    await prisma.foodOrderItem.createMany({
      data: [...orderItemsWithId],
    });

    res.status(200).json({ message: "Success created order" });
  } catch (err) {
    res.status(500).json({ message: "Internal server Error", error: err });
  }
};
