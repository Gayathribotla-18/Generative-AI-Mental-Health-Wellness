import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, MessageCircle, Heart, TrendingUp, Calendar, Sparkles } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Welcome back, {profile?.display_name || "Friend"}!
          </h1>
          <p className="text-lg text-slate-600">Here's how you're doing on your mental wellness journey.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Mood Entries</p>
                  <p className="text-2xl font-bold text-slate-800">12</p>
                  <p className="text-xs text-green-600">+3 this week</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Chat Sessions</p>
                  <p className="text-2xl font-bold text-slate-800">5</p>
                  <p className="text-xs text-blue-600">2 this week</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Self-Care Activities</p>
                  <p className="text-2xl font-bold text-slate-800">8</p>
                  <p className="text-xs text-purple-600">Great progress!</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Streak</p>
                  <p className="text-2xl font-bold text-slate-800">7 days</p>
                  <p className="text-xs text-orange-600">Keep it up!</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/mood-tracker">
                    <Button className="w-full h-20 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center">
                      <BarChart3 className="w-6 h-6 mb-2" />
                      Log Your Mood
                    </Button>
                  </Link>
                  <Link href="/chat">
                    <Button className="w-full h-20 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center">
                      <MessageCircle className="w-6 h-6 mb-2" />
                      Chat with AI
                    </Button>
                  </Link>
                  <Link href="/self-care">
                    <Button className="w-full h-20 bg-purple-600 hover:bg-purple-700 flex flex-col items-center justify-center">
                      <Sparkles className="w-6 h-6 mb-2" />
                      Self-Care Tools
                    </Button>
                  </Link>
                  <Link href="/resources">
                    <Button className="w-full h-20 bg-orange-600 hover:bg-orange-700 flex flex-col items-center justify-center">
                      <Heart className="w-6 h-6 mb-2" />
                      Browse Resources
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">Logged mood: Feeling good</p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">Completed chat session</p>
                      <p className="text-xs text-slate-500">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">Completed breathing exercise</p>
                      <p className="text-xs text-slate-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Suggestion */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Today's Suggestion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Try Gratitude Journaling</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Take 5 minutes to write down three things you're grateful for today.
                  </p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Start Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Weekly check-in</p>
                      <p className="text-xs text-slate-500">Tomorrow</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Self-care reminder</p>
                      <p className="text-xs text-slate-500">In 3 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
