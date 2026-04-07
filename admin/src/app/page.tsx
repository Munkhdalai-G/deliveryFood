import DishCategory from "./dashboard/components/dishCategory";
import Navi from "./dashboard/components/navi";


export default function Home() {
  return (
    <div className="flex bg-gray-100">
      <Navi />
      <DishCategory />
    </div>
  );
}
