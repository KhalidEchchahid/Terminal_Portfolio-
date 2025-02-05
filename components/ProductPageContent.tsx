"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import CheckoutForm from "@/components/CheckoutForm"
import Gallery from "@/components/Gallery"
import Navbar from "@/components/Navbar"
import ProductInfo from "@/components/ProductInfo"
import ProductDiscription from "@/components/ProductDiscription"
import ReviewsSection from "@/components/ReviewsSection"
import Footer from "@/components/Footer"
import type React from "react" // Added import for React

interface ProductPageContentProps {
  product: {
    id: number
    name: string
    price: number
    discount: number
    images: string[]
    colors: string[]
    sizes: string[]
    availableStock: number
    sku: string
  }
  reviews: {
    id: number
    rating: number
    text: string
  }[]
}

const ProductPageContent: React.FC<ProductPageContentProps> = ({ product, reviews }) => {
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0])
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0])
  const [quantity, setQuantity] = useState<number>(1)

  return (
    <div className="bg-gradient-to-r from-[#0E1116] to-[#2F343A] text-yellow-500 shadow-md">
      <Navbar />
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-6">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src="/saad-logo.png" alt="Logo" className="h-16 w-auto" height={60} width={60} />
        </div>
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
  )
}

export default ProductPageContent

