import { Pencil } from "lucide-react";
export default function Dish() {
  return (
    <div>
      <div>Appetizers (6)</div>
      <div>
        <div>
          <div>
            <img src="" alt="" />
            <Pencil
              className="bg-white text-orange-500 rounded-full"
              size={16}
            />
          </div>
          <div>
            <div>Brie Crostini Appetizer</div>
            <div>$12.99</div>
            <div>
              Fluffy pancakes stacked with fruits, cream, syrup, and powdered
              sugar.
            </div>
          </div>
        </div>
        <div>
          <div>
            <img src="" alt="" />
            <Pencil
              className="bg-white text-orange-500 rounded-full"
              size={16}
            />
          </div>
          <div>
            <div>Brie Crostini Appetizer</div>
            <div>$12.99</div>
            <div>
              Fluffy pancakes stacked with fruits, cream, syrup, and powdered
              sugar.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
