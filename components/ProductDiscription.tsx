import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const ProductDiscription = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div
      ref={ref}
      className="bg-gradient-to-r from-[#0E1116] to-[#2F343A] text-white py-16 px-4 sm:px-6 lg:px-8 rounded-lg shadow-2xl"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600"
        >
          وصف المنتج
        </motion.h1>
        <motion.p
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="text-lg sm:text-xl leading-relaxed mb-12 text-center max-w-3xl mx-auto"
        >
          حذاء أنيق ومتين مصمم ليتناسب مع كافة احتياجاتك اليومية والمناسبات
          الرسمية. تم تصنيعه من خامات فاخرة وعالية الجودة تضمن مقاومة طويلة
          الأمد لعوامل التآكل، مع نعل مبطن يوفر راحة فائقة وامتصاصاً ممتازاً
          للصدمات. يتميز الحذاء بتصميم عصري وأنيق يعكس الذوق الرفيع، مع لمسات
          دقيقة تضفي جمالاً استثنائياً. سواء كنت تسعى للأناقة في العمل أو الراحة
          في النزهات اليومية، فإن هذا الحذاء هو الخيار المثالي للتميز والثقة.
        </motion.p>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-[#1A1D21] p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6 text-yellow-400 text-center ">
              المواصفات
            </h2>
            <ul className="space-y-4 text-gray-300">
              {[
                "راحة ممتازة طوال اليوم",
                "النعل: مطاطي مضاد للانزلاق لثبات أكبر",
                "اللون: متوفر بالآلوان التي في الصورة",
                "المقاسات: من 40 إلى 44",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center gap-3"
                >
                  <span className="text-yellow-400 text-xl">✔</span> {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-4">
            <Image
              src="/images/5.jpg"
              width={300}
              height={300}
              alt="product"
              className="w-full h-auto rounded-lg shadow-xl object-cover relative cursor-pointer transform transition duration-500 hover:scale-105"
            />
            <Image
              src="/images/6.jpg"
              width={300}
              height={300}
              alt="product detail"
              className="w-full h-auto rounded-lg shadow-xl object-cover relative cursor-pointer transform transition duration-500 hover:scale-105"
            />
            <Image
              src="/images/11.jpg"
              width={300}
              height={300}
              alt="product detail"
              className="w-full h-auto rounded-lg shadow-xl object-cover relative cursor-pointer transform transition duration-500 hover:scale-105"
            />
          </motion.div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-400">
            شاهد الفيديو التوضيحي
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl flex justify-center items-start">
            <iframe
              className="w-96 h-full"
              src="https://www.youtube.com/embed/KhB9C9_cvC0"
              title="Product Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="text-center"
        >
          <p className="text-xl text-gray-300 mb-8">
            اختر هذا الحذاء ليكون رفيقك المثالي في التنقل والأناقة!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
            onClick={() => {
              const orderSection = document.getElementById("order");
              if (orderSection) {
                orderSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            اطلب الآن
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDiscription;
