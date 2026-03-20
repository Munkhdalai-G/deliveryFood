import express from "express";
import userRouter from "./routes/users.router";
import foodsRouter from "./routes/foods.router";
import categoryRouter from "./routes/foodsCatergory.router";
import orderRouter from "./routes/foodsOrder.router";

const app = express();
const PORT = process.env.PORT || 8787;

app.use(express.json());

app.use("/users", userRouter);
app.use("/foods", foodsRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
// app.use("/order", orderItemRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
