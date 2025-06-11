// components/ui/Modal.tsx
"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"

type ModalProps = {
  isOpen: boolean
  children: React.ReactNode
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      >
        <motion.div
          className="bg-gray-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl max-w-lg w-full mx-4"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ 
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#1DB954]/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#1ed760]/20 rounded-full blur-xl" />
            
            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Modal
