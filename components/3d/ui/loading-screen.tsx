"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-terminal-bg flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          className="w-20 h-20 mb-6 mx-auto relative"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 rounded-full border-t-2 border-terminal-purple"></div>
          <div className="absolute inset-0 rounded-full border-r-2 border-transparent"></div>
          <div className="absolute inset-0 rounded-full border-b-2 border-transparent"></div>
          <div className="absolute inset-0 rounded-full border-l-2 border-transparent"></div>
        </motion.div>

        <motion.h1
          className="text-2xl font-bold text-gradient-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Khalid Echchahid
        </motion.h1>

        <motion.p
          className="text-terminal-text-dim mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading Portfolio...
        </motion.p>
      </motion.div>
    </div>
  )
}

