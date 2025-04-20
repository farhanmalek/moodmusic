// components/ui/Modal.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"

type ModalProps = {
  isOpen: boolean
  children: React.ReactNode
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Modal
