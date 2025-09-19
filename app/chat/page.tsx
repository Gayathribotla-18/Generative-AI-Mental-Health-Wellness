import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { ChatInterface } from "@/components/chat-interface"
import { ChatSidebar } from "@/components/chat-sidebar"

export default async function ChatPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user's chat sessions
  const { data: sessions } = await supabase
    .from("chat_sessions")
    .select("*")
    .eq("user_id", data.user.id)
    .order("updated_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ChatSidebar sessions={sessions || []} userId={data.user.id} />
          </div>

          {/* Main Chat */}
          <div className="lg:col-span-3">
            <ChatInterface userId={data.user.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
