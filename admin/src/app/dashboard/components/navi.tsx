"use client";
import { LayoutDashboard, Truck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navi() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="w-64 shrink-0 h-screen bg-white border-r border-gray-100 sticky top-0">
      <Link href="/" className="flex gap-2 items-center pt-10 px-6">
        <img className="size-12 pt-2" src="/logo.svg" alt="NomNom logo" />
        <div>
          <h1 className="font-bold text-xl">NomNom</h1>
          <p className="text-gray-500 text-sm">Swift delivery</p>
        </div>
      </Link>

      <nav className="flex flex-col pt-20 px-4 gap-3">
        <Link
          href="/dashboard/foods"
          className={`flex gap-3 items-center px-4 h-11 rounded-2xl border border-gray-200 ${pathname === "/dashboard/foods" && "bg-black text-white"}`}
        >
          <LayoutDashboard className="size-5 text-orange-500" />
          <span>Food menu</span>
        </Link>

        <Link
          href="/dashboard/orders"
          className={`flex gap-3 items-center px-4 h-11 rounded-2xl border border-gray-200  ${pathname === "/dashboard/orders" && "bg-black text-white"}`}
        >
          <Truck className="size-5 text-orange-500" />
          <span>Orders</span>
        </Link>
      </nav>
    </div>
  );
}
