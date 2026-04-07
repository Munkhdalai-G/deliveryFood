"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldUpload } from "./CldUpload";
import { ImageUpload } from "./ImageUpload";

type Category = {
  id: number;
  name: string;
};

type FoodForm = {
  name: string;
  ingredients: string;
  price: string;
  image: string;
  foodCategoryId: number | null;
};

type FoodAddDialogProps = {
  onFoodAdded: () => Promise<void>;
  trigger: React.ReactNode;
};

export function FoodAddDialog({ onFoodAdded, trigger }: FoodAddDialogProps) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<FoodForm>({
    name: "",
    ingredients: "",
    price: "",
    image: "",
    foodCategoryId: null,
  });

  // Fetch categories for the dropdown
  useEffect(() => {
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
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files[0];

    if (!file) return alert("Please select a file first");
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "food-images");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dpvymbjdc/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      console.log("data: ", data);

      console.log("Success! Image URL:", data.secure_url);
      setForm({ ...form, image: data.secure_url });
      alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!form.name || !form.price || !form.foodCategoryId) {
      alert("Please fill in name, price and category");
      return;
    }

    try {
      const response = await fetch(
        "https://deliveryfood-d0p6.onrender.com/foods",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            ingredients: form.ingredients,
            price: form.price, // ✅ send as String
            image: form.image,
            foodCategoryId: form.foodCategoryId, // ✅ send as Int ID
          }),
        },
      );

      if (!response.ok) {
        const err = await response.json();
        console.error("Server error:", err);
        throw new Error("Failed to add food");
      }

      setForm({
        name: "",
        ingredients: "",
        price: "",
        image: "",
        foodCategoryId: null,
      });
      setOpen(false);
      onFoodAdded();
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };
  console.log(form);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Add Food</Button>}
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[500px]"
        onOpenAutoFocus={(e) => e.preventDefault()} // ✅ prevents focus trap
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add New Food</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {/* Name */}
          <div className="flex items-center">
            <Label className="min-w-[120px]">Name</Label>
            <Input
              type="text"
              placeholder="Fluffy pancakes ..."
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Ingredients */}
          <div className="flex items-center">
            <Label className="min-w-[120px]">Ingredients</Label>
            <Input
              type="text"
              placeholder="Flour, eggs, milk ..."
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
            />
          </div>

          {/* Price */}
          <div className="flex items-center">
            <Label className="min-w-[120px]">Price</Label>
            <Input
              type="text"
              placeholder="12.99"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          {/* Category - dropdown from real API */}
          <div className="flex items-center">
            <Label className="min-w-[120px]">Category</Label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={form.foodCategoryId ?? ""}
              onChange={(e) =>
                setForm({ ...form, foodCategoryId: Number(e.target.value) })
              }
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className="flex items-center">
            <Label className="min-w-[120px]">Image</Label>
            <div className="flex flex-col gap-2">
              {/* <CldUpload onUpload={handleImageUpload} /> */}
              <ImageUpload
                image={form.image}
                handleUploadImage={handleImageUpload}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button type="button" onClick={handleSubmit}>
            Add Food
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
