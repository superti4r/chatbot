"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import { useChat } from "@/hooks/useChat"
import { ModeToggle } from "@/components/ui/mode-toggle"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"

export function UI() {
  const {
    messages,
    input,
    setInput,
    isThinking,
    sendMessage,
    handleKeyDown,
    chatRef,
  } = useChat()

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-4xl flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between relative">
          <div className="text-center w-full">
            <h1 className="text-2xl font-bold tracking-tight">superti4r AI</h1>
            <p className="text-sm text-muted-foreground">
              Integrated with - Gemini 2.5
            </p>
          </div>
          <div className="absolute top-0 right-0">
            <ModeToggle />
          </div>
        </div>

        <Card className="flex-1 border shadow-sm bg-muted/30 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-6 z-10 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-6 z-10 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
          <CardContent className="p-4 h-full">
            <ScrollArea className="h-full overflow-y-auto" ref={chatRef}>
              <div className="flex flex-col gap-4 pr-4 pb-6">
                {messages.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center mt-10">
                    Mulai percakapan dengan mengetik sesuatu...
                  </p>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div className="flex items-end gap-3 max-w-[90%] sm:max-w-[80%]">
                        {msg.sender === "ai" && (
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                            AI
                          </div>
                        )}

                        <div
                          className={`px-4 py-2 rounded-xl text-sm shadow-md break-words whitespace-pre-wrap overflow-x-auto ${msg.sender === "user"
                              ? "bg-primary text-primary-foreground rounded-br-none"
                              : "bg-background border text-foreground rounded-bl-none"
                            }`}
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                              code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }: any) {
                                const match = /language-(\w+)/.exec(
                                  className || ""
                                )
                                return !inline && match ? (
                                  <div className="mt-2 mb-2 overflow-x-auto rounded-lg border border-muted bg-muted/50">
                                    <SyntaxHighlighter
                                      style={vscDarkPlus}
                                      language={match[1]}
                                      PreTag="div"
                                      customStyle={{
                                        background: "transparent",
                                        margin: 0,
                                        padding: "1rem",
                                        fontSize: "0.875rem",
                                      }}
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                  </div>
                                ) : (
                                  <code
                                    className="bg-muted px-1 py-0.5 rounded text-sm font-mono"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                )
                              },
                              p({ children }) {
                                return (
                                  <p className="mb-2 last:mb-0">{children}</p>
                                )
                              },
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>

                        {msg.sender === "user" && (
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
                            ME
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}

                {isThinking && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white dark:text-black flex items-center justify-center text-sm font-bold">
                      G
                    </div>
                    <div className="flex items-center gap-1">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Asisten sedang menjawab...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex gap-2 sticky bottom-4 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 px-1 rounded-xl shadow-sm"
        >
          <Input
            className="flex-1"
            placeholder="Tulis pertanyaan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isThinking}
          />
          <Button type="submit" disabled={isThinking}>
            Kirim
          </Button>
        </form>
      </div>
    </div>
  )
}
