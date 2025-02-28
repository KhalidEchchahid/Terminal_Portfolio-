import ProductPageContent from "@/components/ProductPageContent"

// Static data
const product = {
  id: 1,
  name: "متوفر لاي نوع من الانشطة",
  price: 179,
  discount: 250,
  images: [
    "/images/13.png",
    "/images/5.jpg",
    "/images/7.jpg",
    "/images/9.jpg",
    "/images/14.jpg",
    "/images/15.jpg",
    "/images/16.jpg",
    "/images/8.jpg",
    "/images/6.jpg",
  ],
  colors: [
    { name: "الرمادي", available: true },
    { name: "الأبيض", available: false },
    { name: "الأسود", available: true },
  ],
  sizes: ["40", "41", "42", "43", "44"],
  availableStock: 50,
  sku: "KANDRISSI-J001",
}

const reviews = [
  { id: 1, rating: 5, text: "وصلتني السبرديلة، داكشي ناضي شكرا أخي👍" },
  {
    id: 2,
    rating: 4,
    text: " السبرديلة كما شفتها فالصورة، شكرا خويا اللهم بارك ☺️",
  },
  {
    id: 3,
    rating: 5,
    text: "صافي أخي راه وصلتني لكموند، إلكان شي جديد خبرني👍",
  },
]

export default function Page() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <ProductPageContent product={product} reviews={reviews} />
    </div>
  )
}

// Ensure static rendering
export const dynamic = "force-static"

