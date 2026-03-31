import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";  

export default function Categories() {
  const categories = [
    "All Dishes",
    "Appetizers",
    "Salads",
    "Pizzas",
    "Lunch favorites",
    "Main dishes",
    "Fish & Sea foods",
    "Brunch",
    "Side dish",
    "Desserts",
    "Beverages",
  ];
  return (
    <div>
      <div>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <div>NomNom</div>
          <div>Swift delivery</div>
        </div>
        <div>
          <div>Dishes Category</div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category}>{category} 5</Badge>
            ))}

            <Plus className="bg-orange-500 text-white rounded-full" size={16} />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
