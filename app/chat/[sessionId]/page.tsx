import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { ChatInterface } from "@/components/chat-interface"
import { ChatSidebar } from "@/components/chat-sidebar"

interface ChatSessionPageProps {
  params: Promise<{ sessionId: string }>
}

export default async function ChatSessionPage({ params }: ChatSessionPageProps) {
  const { sessionId } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Verify session belongs to user
  const { data: session } = await supabase
    .from("chat_sessions")
    .select("*")
    .eq("id", sessionId)
    .eq("user_id", data.user.id)
    .single()

  if (!session) {
    redirect("/chat")
  }

  // Get all user sessions for sidebar
  const { data: sessions } = await supabase
    .from("chat_sessions")
    .select("*")
    .eq("user_id", data.user.id)
    .order("updated_at", { ascending: false })

  // Get messages for this session
  const { data: messages } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ChatSidebar sessions={sessions || []} userId={data.user.id} currentSessionId={sessionId} />
          </div>

          {/* Main Chat */}
          <div className="lg:col-span-3">
            <ChatInterface userId={data.user.id} sessionId={sessionId} initialMessages={messages || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
