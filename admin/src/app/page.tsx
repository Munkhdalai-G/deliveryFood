import DishCategory from "@/components/ui/dishCategory";
import Navi from "@/components/ui/navi";

export default function Home() {
  return (
    <div className="flex bg-gray-100">
      <Navi />
      <DishCategory />
    </div>
  );
}
