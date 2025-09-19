"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { format } from "date-fns"

interface ChatSession {
  id: string
  title: string
  created_at: string
  updated_at: string
}

interface ChatSidebarProps {
  sessions: ChatSession[]
  userId: string
  currentSessionId?: string
}

export function ChatSidebar({ sessions, userId, currentSessionId }: ChatSidebarProps) {
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const createNewSession = async () => {
    setIsCreating(true)
    try {
      const { data, error } = await supabase
        .from("chat_sessions")
        .insert({
          user_id: userId,
          title: "New Chat",
        })
        .select()
        .single()

      if (error) throw error

      router.push(`/chat/${data.id}`)
    } catch (error) {
      console.error("Error creating session:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const deleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!confirm("Are you sure you want to delete this chat?")) return

    try {
      const { error } = await supabase.from("chat_sessions").delete().eq("id", sessionId)

      if (error) throw error

      if (currentSessionId === sessionId) {
        router.push("/chat")
      } else {
        router.refresh()
      }
    } catch (error) {
      console.error("Error deleting session:", error)
    }
  }

  return (
    <Card className="border-0 shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          AI Support Chat
        </CardTitle>
        <Button onClick={createNewSession} disabled={isCreating} className="w-full bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          {isCreating ? "Creating..." : "New Chat"}
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        {sessions.length > 0 ? (
          <div className="space-y-2">
            {sessions.map((session) => (
              <Link key={session.id} href={`/chat/${session.id}`}>
                <div
                  className={`p-3 rounded-lg border transition-colors cursor-pointer group ${
                    currentSessionId === session.id
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{session.title}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {format(new Date(session.updated_at), "MMM dd, h:mm a")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => deleteSession(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No chats yet</p>
            <p className="text-xs">Start a conversation to get support</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
