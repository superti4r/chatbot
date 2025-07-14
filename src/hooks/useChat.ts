import { useEffect, useRef, useState } from "react"

export type Message = {
  sender: "user" | "ai"
  text: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage: Message = { sender: "user", text: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsThinking(true)

    const identityTriggers = [
      "siapa kamu",
      "kamu siapa",
      "siapa nama kamu",
      "apa kamu manusia",
      "siapa anda",
      "kamu itu apa",
    ]

    const lower = trimmed.toLowerCase()
    const isIdentityQuestion = identityTriggers.some((q) => lower.includes(q))

    if (isIdentityQuestion) {
      const aiMessage: Message = {
        sender: "ai",
        text:
          "Saya adalah asisten AI yang dikembangkan oleh Bachtiar Dwi Pramudi menggunakan model Gemini.",
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, aiMessage])
        setIsThinking(false)
      }, 1500)

      return
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await res.json()
      const aiMessage: Message = { sender: "ai", text: data.text }
      setMessages((prev) => [...prev, aiMessage])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ Layanan tidak tersedia. Silakan coba beberapa saat lagi.",
        },
      ])
    } finally {
      setIsThinking(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, isThinking])

  return {
    messages,
    input,
    setInput,
    isThinking,
    sendMessage,
    handleKeyDown,
    chatRef,
  }
}
