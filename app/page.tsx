"use client";
import CheckoutForm from "@/components/CheckoutForm";
import Gallery from "@/components/Gallery";
import Navbar from "@/components/Navbar";
import ProductInfo from "@/components/ProductInfo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductDiscription from "@/components/ProductDiscription";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

const product = {
  id: 1,
  name: "متوفر لاي نوع من الانشطة",
  price: 249,
  discount: 350,
  images: ["/images/shoes1.jpg", "/images/shoes2.jpg", "/images/shoes3.jpg"],
  colors: ["الاسود بالرمادي", "الابيض بالازرق"],
  sizes: ["39", "40","41","43"],
  availableStock: 50,
  sku: "KANDRISSI-J001",
};

const reviews = [
  { id: 1, rating: 5, text: "وصلتني السبرديلة، داكشي ناضي شكرا أخي👍" },
  {
    id: 2,
    rating: 4,
    text: " السبرديلة كما شفتها فالصورة، شكرا خويا اللهم بارك ☺️",
  },
  {
    id: 3,
    rating: 5,
    text: "صافي أخي راه وصلتني لكموند، إلكان شي جديد خبرني👍",
  },
];

const Page = () => {
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="bg-gradient-to-r from-[#0E1116] to-[#2F343A] text-yellow-500  shadow-md ">
      <Navbar />
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4"
        >
          حذاء رياضي مريح وأنيق
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center mb-8"
        >
          ماركات جديدة من السبرديلة بجوج ديال الألوان، مميزة وأنيقة !
        </motion.p>
      </header>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          <Gallery images={product.images} />
          <ProductInfo
            title={product.name}
            sizes={product.sizes}
            colors={product.colors}
            price={product.price}
            discount={product.discount}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
        <CheckoutForm
          price={product.price}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          quantity={quantity}
        />
        <ProductDiscription />
        <ReviewsSection reviews={reviews} />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
