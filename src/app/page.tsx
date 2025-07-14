"use client"

import { useEffect, useState } from "react"
import { Preloader } from "@/components/ui/preloader"
import { UI } from "@/components/ui/chat/ui"

export default function HomePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <Preloader show={loading} />
      <main
        className={`transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        } flex flex-col items-center px-4 py-8 min-h-screen bg-background`}
      >
        <UI />
      </main>
    </>
  )
}
