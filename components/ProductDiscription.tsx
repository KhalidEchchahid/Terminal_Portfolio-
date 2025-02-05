import React from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

const ProductDiscription = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <div
      ref={ref}
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
      <motion.p initial="hidden" animate={controls} variants={fadeInUp} className="text-lg leading-relaxed mb-6">
        هذا الحذاء الرياضي مصمم بعناية ليوفر لك الراحة والأناقة طوال اليوم. يتميز بتصميم عصري يتماشى مع جميع الإطلالات
        اليومية، سواء كانت كاجوال أو رياضية. مصنوع من خامات عالية الجودة تضمن التهوية والمتانة، مع وسادة قدم ناعمة
        لتوفير دعم مثالي لراحة قدميك.
      </motion.p>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        className="bg-[#1A1D21] p-6 rounded-md shadow-lg flex-col justify-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">المواصفات:</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <Image
              src="/images/4.jpg"
              width={300}
              height={300}
              alt="product"
              className="w-full h-auto rounded-lg shadow-xl object-cover relative cursor-pointer"
            />
            <Image
              src="/images/5.jpg"
              width={300}
              height={300}
              alt="product detail"
              className="w-full h-auto rounded-lg shadow-xl object-cover relative cursor-pointer"
            />
          </div>
          <motion.li initial="hidden" animate={controls} variants={fadeInUp} className="flex items-center gap-2">
            <span>✔️</span> المقاسات: من 39 إلى 44
          </motion.li>
        </ul>
      </motion.div>
      <motion.div initial="hidden" animate={controls} variants={fadeInUp} className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">شاهد الفيديو التوضيحي</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full rounded-lg shadow-xl"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Product Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>
      <motion.div initial="hidden" animate={controls} variants={fadeInUp} className="text-center mt-8">
        <p className="text-lg text-gray-300">اختر هذا الحذاء ليكون رفيقك المثالي في التنقل والأناقة!</p>
      </motion.div>
    </div>
  )
}

export default ProductDiscription

