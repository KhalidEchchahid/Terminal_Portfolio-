"use client"

import { useState, useLayoutEffect } from "react"
import { motion, useAnimate } from "framer-motion"
import Image from "next/image"
import CheckoutForm from "@/components/CheckoutForm"
import Gallery from "@/components/Gallery"
import Navbar from "@/components/Navbar"
import ProductInfo from "@/components/ProductInfo"
import ProductDiscription from "@/components/ProductDiscription"
import ReviewsSection from "@/components/ReviewsSection"
import Footer from "@/components/Footer"
import type React from "react"
import { ShoppingCart } from "lucide-react"

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
  const [scope, animate] = useAnimate()
  const [isLoaded, setIsLoaded] = useState(false)

  const calculateTotalPrice = (qty: number) => {
    if (qty === 1) return 179
    if (qty === 2) return 299
    if (qty === 3) return 399
    return 179 * qty // Default calculation for quantities > 3
  }

  useLayoutEffect(() => {
    const animateContent = async () => {
      await animate(scope.current, { opacity: 1 }, { duration: 0.5 })
      setIsLoaded(true)
    }
    animateContent()
  }, [animate, scope])

  const scrollToOrder = () => {
    const orderSection = document.getElementById("order")
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen text-gray-100 pb-24 md:pb-0">
      <Navbar />
      <motion.div ref={scope} initial={{ opacity: 0 }} className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-16">
          <Image src="/saad-logo.png" alt="Logo" className="mx-auto mb-6" height={80} width={80} />
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-yellow-400 mb-4"
          >
            حذاء النخبة
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300"
          >
            نقدم لك جودة ممتازة ،لانك تستحق الافضل!
          </motion.p>
        </header>
        <main>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={isLoaded ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-full lg:w-[48%]"
            >
              <Gallery images={product.images} />
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={isLoaded ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-full lg:w-[48%]"
            >
              <ProductInfo
                title={product.name}
                sizes={product.sizes}
                colors={product.colors}
                price={calculateTotalPrice(quantity)}
                discount={product.discount}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <CheckoutForm
              price={calculateTotalPrice(quantity)}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
            />
          </motion.div>
          <ProductDiscription />
          <ReviewsSection reviews={reviews} />
        </main>
      </motion.div>
      <Footer />
      <motion.button
        className="fixed bottom-4 left-4 right-4 py-3 px-6 bg-yellow-400 text-gray-900 font-bold text-lg rounded-full shadow-lg hover:bg-yellow-300 transition-colors md:hidden z-50 flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToOrder}
      >
        <ShoppingCart className="w-6 h-6 mr-2" />
        <span>اطلب الآن</span>
      </motion.button>
    </div>
  )
}

export default ProductPageContent

