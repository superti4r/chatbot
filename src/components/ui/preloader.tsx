"use client"

import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface PreloaderProps {
  show: boolean
}

export function Preloader({ show }: PreloaderProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-background"
          )}
        >
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
