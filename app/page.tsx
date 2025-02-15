import ProductPageContent from "@/components/ProductPageContent";

// Static data
const product = {
  id: 1,
  name: "متوفر لاي نوع من الانشطة",
  price: 299,
  discount: 450,
  images: [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/10.jpg",
    "/images/12.jpg",
  ],
  colors: ["الرمادي الداكن", "الباج بالبني", "الأسود"],
  sizes: ["40", "41", "42", "43", "44"],
  availableStock: 50,
  sku: "KANDRISSI-J001",
};

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
];

// This will be statically rendered at build time
export default function Page() {
  return <ProductPageContent product={product} reviews={reviews} />;
}

// Ensure static rendering
export const dynamic = "force-static";
