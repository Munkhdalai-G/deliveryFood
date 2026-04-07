"use client";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { FoodAddDialog } from "./FoodAddDialog";

type Category = {
  id: number;
  name: string;
};

type Food = {
  id: number;
  name: string;
  price: string;
  image: string;
  ingredients: string;
  foodCategoryId: number;
};

export default function DishCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "https://deliveryfood-d0p6.onrender.com/categories",
      );
      const data = await res.json();
      setCategories(data.category);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch foods from backend
  const fetchFoods = async () => {
    try {
      const res = await fetch("https://deliveryfood-d0p6.onrender.com/foods");
      const data = await res.json();
      setFoods(data.foods); // adjust if your API returns different key
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchFoods();
  }, []);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        "https://deliveryfood-d0p6.onrender.com/categories",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: categoryName }),
        },
      );
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setCategories((prev) => [...prev, data.category]);
      setCategoryName("");
      setShowModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Dishes Category */}
      <div className="mx-10 bg-white px-8 flex flex-col pb-5 border border-transparent rounded-2xl mt-20">
        <p className="text-2xl font-semibold py-3">Dishes category</p>
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              className="bg-white text-black border-gray-300 text-[17px] flex gap-2 cursor-pointer"
            >
              {cat.name}
              <div className="text-white bg-black rounded-4xl px-1.5 h-5 justify-center text-center items-center flex text-[14px]">
                {foods.filter((f) => f.foodCategoryId === cat.id).length}
              </div>
            </Badge>
          ))}
          <button onClick={() => setShowModal(true)}>
            <Plus className="border rounded-4xl bg-red-500 text-white h-9 w-9" />
          </button>
        </div>
      </div>

      {/* Foods Section */}
      <div className="mx-10 bg-white px-8 flex flex-col pb-5 border border-transparent rounded-2xl">
        <div className="text-2xl font-semibold py-3 flex gap-1">
          All Foods <div>({foods.length})</div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {/* Add New Dish Card */}
          <FoodAddDialog
            onFoodAdded={fetchFoods} // ✅ refreshes list after adding
            trigger={
              <div className="border border-dashed rounded-2xl border-orange-600 flex flex-col justify-center items-center h-60 gap-2 cursor-pointer hover:bg-orange-50 transition">
                <Plus className="border rounded-2xl bg-red-500 text-white h-9 w-9" />
                <p className="flex flex-wrap w-35 justify-center text-center">
                  Add new Dish
                </p>
              </div>
            }
          />

          {/* ✅ Render real foods */}
          {foods.map((food) => (
            <div
              key={food.id}
              className="border rounded-2xl border-orange-600 flex flex-col items-center h-60 overflow-hidden"
            >
              <div className="w-full px-4 mt-4">
                <img
                  className="w-full h-32 rounded-2xl object-cover"
                  src={food.image || "/pizza.jpeg"}
                  alt={food.name}
                />
              </div>
              <div className="px-4 w-full">
                <div className="flex text-[14px] gap-2 pt-2.5 justify-between">
                  <div className="text-orange-600 truncate">{food.name}</div>
                  <div className="shrink-0">${food.price}</div>
                </div>
                <p className="text-[14px] text-gray-500 line-clamp-2">
                  {food.ingredients}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-105 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add new category</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="size-5 text-gray-500 hover:text-black" />
              </button>
            </div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Category name
            </label>
            <input
              type="text"
              placeholder="Type category name..."
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black mb-6"
            />
            <button
              onClick={handleAddCategory}
              disabled={loading || !categoryName.trim()}
              className="w-full bg-black text-white rounded-xl py-3 font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {loading ? "Adding..." : "Add category"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
