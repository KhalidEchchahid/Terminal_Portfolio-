"use client"

import type React from "react"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { createOrder } from "@/lib/actions/order.action"

const formSchema = z.object({
  fullname: z.string().min(2, "الاسم الكامل مطلوب").max(50, "الاسم الكامل يجب ألا يتجاوز 50 حرفًا"),
  phone: z.string().min(10, "رقم الهاتف مطلوب").max(13, "رقم الهاتف يجب أن يكون بين 10 و13 رقمًا"),
  city: z.string().min(1, "المدينة مطلوبة"),
})

interface Props {
  selectedColor: string
  selectedSize: string
  quantity: number
  price: number
}

const CheckoutForm = ({ selectedColor, selectedSize, quantity, price }: Props) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const totalAmount = price * quantity
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      city: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setError("")

    if (selectedColor === "" || selectedSize === "") {
      setError("يرجى اختيار اللون والحجم قبل متابعة الطلب.")
      setIsSubmitting(false)
      return
    }

    try {
      const newOrder = await createOrder({
        name: values.fullname,
        city: values.city,
        phone: values.phone,
        totalAmount: totalAmount,
        color: selectedColor,
        shippingAdress: "",
        size: selectedSize,
        quantity,
      })

      router.push("/thanks")
    } catch (error) {
      console.log("[checkout_post]", error)
      setError("حدث خطأ ما ، يرجى المحاولة مرة أخرى")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }

  return (
    <div className="flex items-start justify-center mb-10 px-4" id="order">
      <div className="w-full max-w-lg pt-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">للطلب إملأ الخانات أسفله</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</div>}
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="الاسم الكامل"
                      {...field}
                      onKeyDown={handleKeyPress}
                      className="border-gray-500 focus:border-yellow-400 focus:ring-yellow-400 rounded-md shadow-sm bg-[#0E1116] text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="رقم الهاتف"
                      {...field}
                      onKeyDown={handleKeyPress}
                      inputMode="numeric"
                      pattern="(?:\+212|0)[5-7][0-9]{8}"
                      className="border-gray-500 focus:border-yellow-400 focus:ring-yellow-400 rounded-md shadow-sm bg-[#0E1116] text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="المدينة"
                      {...field}
                      onKeyDown={handleKeyPress}
                      className="border-gray-500 focus:border-yellow-400 focus:ring-yellow-400 rounded-md shadow-sm bg-[#0E1116] text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 w-full rounded-lg hover:opacity-90 transition duration-300"
              disabled={isSubmitting}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            >
              {isSubmitting ? (
                <motion.div
                  className="flex justify-center items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className="h-4 w-4 bg-black rounded-full inline-block mr-2"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  جاري الطلب...
                </motion.div>
              ) : (
                "أطلب الان"
              )}
            </motion.button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CheckoutForm

