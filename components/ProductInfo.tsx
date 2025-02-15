"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  title: string;
  sizes: string[];
  colors: string[];
  price: number;
  discount: number;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductInfo = ({
  title,
  sizes,
  colors,
  price,
  discount,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
}: Props) => {
  const [animatePrice, setAnimatePrice] = useState(false);
  const discountPercentage = discount
    ? Math.round(((discount * quantity - price) / discount) * 100)
    : 0;

  useEffect(() => {
    setAnimatePrice(true);
    const timer = setTimeout(() => setAnimatePrice(false), 300);
    return () => clearTimeout(timer);
  }, [animatePrice]); // Updated dependency

  const quantityOptions = [
    { value: 1, price: 179 },
    { value: 2, price: 299 },
    { value: 3, price: 399 },
  ];

  return (
    <div className="max-w-[400px] p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl text-gray-100">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">{title}</h1>

      <motion.div
        className="mb-6 p-4 bg-gray-800 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <motion.p
            className="text-3xl font-bold text-yellow-400"
            animate={{ scale: animatePrice ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {price} درهم
          </motion.p>
          {discount > 0 && (
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-400 line-through">
                {discount} درهم
              </p>
              <p className="text-sm font-semibold text-green-400">
                وفر {discountPercentage}%
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {colors.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-200 mb-2">
            اختر اللون:
          </h2>
          <div className="flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <motion.button
                key={index}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedColor === color
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedColor(color)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {color}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-200 mb-2">
            اختر الحجم:
          </h2>
          <div className="flex flex-wrap gap-1">
            {sizes.map((size, index) => (
              <motion.button
                key={index}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedSize === size
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedSize(size)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-200 mb-2">
          الكمية والسعر:
        </h2>
        <Select
          value={quantity.toString()}
          onValueChange={(value) => setQuantity(Number.parseInt(value))}
        >
          <SelectTrigger className="w-full bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 transition-colors">
            <SelectValue placeholder="اختر الكمية" />
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-gray-200 border-gray-700">
            {quantityOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value.toString()}
                className="hover:bg-gray-700"
              >
                {option.value} - {option.price} درهم
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* <motion.button
        className="w-full py-3 bg-yellow-400 text-gray-900 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          const orderSection = document.getElementById("order");
          if (orderSection) {
            orderSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        اطلب الآن
      </motion.button> */}
    </div>
  );
};

export default ProductInfo;
