import { ChevronDown, ChevronsUpDown } from "lucide-react";


const statuses = ["Pending", "Delivered", "Cancelled"];

const orders = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  customer: `user${i + 1}@gmail.com`,
  food: `${(i % 3) + 1} foods`,
  date: `2024/12/${20 + i}`,
  total: `$${(26.97 + i * 7).toFixed(2)}`,
  address:
    "СБД, 12-р хороо, СБД нэгдсэн эмнэлэг | 100 айлын гүүрэн гарцны хойд талд 4д ногоон",
  status: statuses[i % statuses.length],
}));

export default function Orderss() {
  return (
    <div className="w-full flex flex-col mx-10 border border-transparent mt-20 mb-30 rounded-2xl bg-white">
      {/* Header */}
      <div className="flex px-5 justify-between border">
        <div className="flex gap-4 items-center">
          <h1>Orders</h1>
          <p>{orders.length} items</p>
        </div>
        <div className="flex gap-4 items-center">
          <div>input</div>
          <div>Change delivery state</div>
        </div>
      </div>

      {/* Column headers */}
      <div className="flex justify-evenly border">
        <input type="checkbox" />
        <p>№</p>
        <p>Customer</p>
        <p>Food</p>
        <p className="flex gap-3">
          Date <ChevronsUpDown className="mt-1" size={17} />
        </p>
        <p>Total</p>
        <p className="w-40 truncate">Delivery Address</p>
        <p className="flex gap-3">
          Delivery state <ChevronsUpDown className="mt-1" size={17} />
        </p>
      </div>

      {/* Rows */}
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-evenly items-center border h-12"
        >
          <input type="checkbox" />
          <p>{order.id}</p>
          <p>{order.customer}</p>
          <p className="flex items-center">
            {order.food} <ChevronDown size={17} />
          </p>
          <p>{order.date}</p>
          <p>{order.total}</p>
          <p className="w-40 truncate" title={order.address}>
            {order.address}
          </p>
          <div className="flex items-center">
            {order.status} <ChevronDown size={17} />
          </div>
        </div>
      ))}
    </div>
  );
}
