import { cn } from "@/lib/utils"

export function ChatMessage({
  role,
  message,
}: {
  role: "user" | "bot"
  message: string
}) {
  const isUser = role === "user"

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-md rounded-2xl px-4 py-2 text-sm shadow-md",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {message}
      </div>
    </div>
  )
}
