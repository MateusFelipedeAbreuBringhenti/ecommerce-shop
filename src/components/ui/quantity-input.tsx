import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantityInputProps {
  initialQuantity?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export function QuantityInput({
  initialQuantity = 1,
  min = 0,
  max = Infinity,
  onChange,
  className = "",
}: QuantityInputProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const update = (value: number) => {
    setQuantity(value);
    onChange?.(value);
  };

  const handleIncrease = () => update(Math.min(quantity + 1, max));
  const handleDecrease = () => update(Math.max(quantity - 1, min));

  return (
    <div className={`flex items-center gap-1 border rounded-md p-1 w-fit  ${className}`}>
      <Button variant="outline" size="sm" disabled={quantity <= min} onClick={handleDecrease}>
        <MinusIcon size={16} />
      </Button>

      <div className="px-3 text-sm font-medium min-w-10 text-white text-center">{quantity}</div>

      <Button variant="outline" size="sm" disabled={quantity >= max} onClick={handleIncrease}>
        <PlusIcon size={16} />
      </Button>
    </div>
  );
}