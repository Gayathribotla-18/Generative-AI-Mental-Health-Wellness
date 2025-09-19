"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Heart } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  created_at: string
}

interface ChatInterfaceProps {
  userId: string
  sessionId?: string
  initialMessages?: ChatMessage[]
}

export function ChatInterface({ userId, sessionId, initialMessages = [] }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState(sessionId)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const createSessionIfNeeded = async () => {
    if (currentSessionId) return currentSessionId

    const { data, error } = await supabase
      .from("chat_sessions")
      .insert({
        user_id: userId,
        title: "New Chat",
      })
      .select()
      .single()

    if (error) throw error

    setCurrentSessionId(data.id)
    router.push(`/chat/${data.id}`)
    return data.id
  }

  const updateSessionTitle = async (sessionId: string, firstMessage: string) => {
    const title = firstMessage.length > 50 ? firstMessage.substring(0, 50) + "..." : firstMessage

    await supabase
      .from("chat_sessions")
      .update({
        title,
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId)
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    try {
      // Create session if needed
      const activeSessionId = await createSessionIfNeeded()

      // Add user message to UI immediately
      const userMsg: ChatMessage = {
        id: `temp-${Date.now()}`,
        role: "user",
        content: userMessage,
        created_at: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, userMsg])

      // Save user message to database
      const { data: savedUserMsg } = await supabase
        .from("chat_messages")
        .insert({
          session_id: activeSessionId,
          role: "user",
          content: userMessage,
        })
        .select()
        .single()

      // Update session title if this is the first message
      if (messages.length === 0) {
        await updateSessionTitle(activeSessionId, userMessage)
      }

      // Call AI API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          sessionId: activeSessionId,
        }),
      })

      if (!response.ok) throw new Error("Failed to get AI response")

      const { message: aiResponse } = await response.json()

      // Add AI response to UI
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: aiResponse,
        created_at: new Date().toISOString(),
      }

      // Update messages with real IDs
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove temp user message
        { ...userMsg, id: savedUserMsg.id }, // Add real user message
        aiMsg, // Add AI message
      ])

      // Save AI message to database
      await supabase.from("chat_messages").insert({
        session_id: activeSessionId,
        role: "assistant",
        content: aiResponse,
      })

      // Update session timestamp
      await supabase.from("chat_sessions").update({ updated_at: new Date().toISOString() }).eq("id", activeSessionId)
    } catch (error) {
      console.error("Error sending message:", error)
      // Remove the temporary user message on error
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-0 shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-600" />
          AI Mental Health Support
        </CardTitle>
        <p className="text-slate-600 text-sm">
          I'm here to listen and provide support. Remember, I'm an AI assistant and not a replacement for professional
          help.
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Welcome to AI Support</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                I'm here to provide a safe space to talk about your feelings, offer coping strategies, and support your
                mental wellness journey.
              </p>
              <div className="grid gap-2 max-w-sm mx-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput("I'm feeling anxious today")}
                  className="text-left justify-start"
                >
                  "I'm feeling anxious today"
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput("Can you help me with stress management?")}
                  className="text-left justify-start"
                >
                  "Can you help me with stress management?"
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput("I'm having trouble sleeping")}
                  className="text-left justify-start"
                >
                  "I'm having trouble sleeping"
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-white border border-slate-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.role === "user" ? "text-blue-100" : "text-slate-500"}`}>
                      {format(new Date(message.created_at), "h:mm a")}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-slate-600" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <div className="p-6 border-t border-slate-200">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 border-slate-200 focus:border-blue-400"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-slate-500 mt-2">
            This AI provides support but is not a substitute for professional mental health care.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
