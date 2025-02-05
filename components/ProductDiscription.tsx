import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const ProductDiscription = () => {
  // Hook to control animations when the component enters the viewport
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

  // Start animation when inView is true
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div
      ref={ref} // Reference for the scroll trigger
      className="bg-gradient-to-r from-[#0E1116] to-[#2F343A] text-white p-8 rounded-lg shadow-lg flex-col justify-center items-center"
    >
      <motion.h1
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600"
      >
        وصف المنتج
      </motion.h1>
      <motion.p
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        className="text-lg leading-relaxed mb-6"
      >
        هذا الحذاء الرياضي مصمم بعناية ليوفر لك الراحة والأناقة طوال اليوم.
        يتميز بتصميم عصري يتماشى مع جميع الإطلالات اليومية، سواء كانت كاجوال أو
        رياضية. مصنوع من خامات عالية الجودة تضمن التهوية والمتانة، مع وسادة قدم
        ناعمة لتوفير دعم مثالي لراحة قدميك.
      </motion.p>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        className="bg-[#1A1D21] p-6 rounded-md shadow-lg flex-col justify-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
          المواصفات:
        </h2>
        <ul className="space-y-2 text-gray-300">
          {[
            "الخامة: نسيج شبكي يسمح بتهوية القدمين",
            "النعل: مطاطي مضاد للانزلاق لثبات أكبر",
            "اللون: متوفر بالآلوان التي في الصورة",
          ].map((item, index) => (
            <motion.li
              key={index}
              initial="hidden"
              animate={controls}
              variants={fadeInUp}
              className="flex items-center gap-2"
            >
              <span>✔️</span> {item}
            </motion.li>
          ))}
          <Image
            src="/images/4.jpg"
            width={300}
            height={300}
            alt="product"
            className="w-96 h-auto rounded-lg shadow-xl object-cover relative cursor-pointer"
          />
          <motion.li
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
            className="flex items-center gap-2"
          >
            <span>✔️</span> المقاسات: من 39 إلى 44
          </motion.li>
        </ul>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        className="text-center mt-8"
      >
        <p className="text-lg text-gray-300">
          اختر هذا الحذاء ليكون رفيقك المثالي في التنقل والأناقة!
        </p>
      </motion.div>
    </div>
  );
};

export default ProductDiscription;
