import Navi from "@/app/dashboard/components/navi";
import DishCategory from "./dashboard/components/dishCategory";

export default function Home() {
  return (
    <div className="flex bg-gray-100">
      <Navi />
      <DishCategory />
    </div>
  );
}
