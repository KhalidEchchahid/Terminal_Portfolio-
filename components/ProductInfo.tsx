"use client"

interface Props {
  title: string
  sizes: string[]
  colors: string[]
  price: number
  discount: number
  selectedColor: string
  setSelectedColor: (color: string) => void
  selectedSize: string
  setSelectedSize: (size: string) => void
  quantity: number
  setQuantity: (quantity: number) => void
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
  const discountPercentage = discount ? Math.round(((discount - price) / discount) * 100) : 0

  return (
    <div className="max-w-[400px] p-2 text-gray-300">
      <h1 className="text-3xl font-bold text-yellow-500">{title}</h1>

      <div className="mt-4 flex justify-between">
        <div className="flex gap-4">
          <p className="text-2xl font-bold text-gray-200">{price} درهم</p>
          {discount > 0 && <p className="text-sm text-gray-400 line-through mt-3">{discount} درهم</p>}
        </div>
        {discountPercentage > 0 && (
          <div className="bg-green-500 h-6 text-black text-xs font-semibold px-2 py-1 rounded-2xl">
            {discountPercentage}%-
          </div>
        )}
      </div>

      {colors.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-200">اضغط على اللون:</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-lg border ${
                  selectedColor === color
                    ? "bg-yellow-500 text-black border-transparent"
                    : "bg-gray-800 text-gray-300 hover:bg-yellow-500 hover:text-black"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-200">اضغط على الحجم:</h2>
          <div className="flex gap-2 mt-2">
            {sizes.map((size, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-lg border ${
                  selectedSize === size
                    ? "bg-yellow-500 text-black border-transparent"
                    : "bg-gray-800 text-gray-300 hover:bg-yellow-500 hover:text-black"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-200">الكمية:</h2>
        <div className="flex items-center gap-4 mt-3">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-black font-bold text-xl hover:bg-yellow-600 transition-colors"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            -
          </button>
          <p className="text-2xl font-bold text-gray-200">{quantity}</p>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-black font-bold text-xl hover:bg-yellow-600 transition-colors"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo

