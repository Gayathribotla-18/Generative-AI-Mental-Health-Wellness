import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { MoodEntryForm } from "@/components/mood-entry-form"
import { MoodChart } from "@/components/mood-chart"
import { MoodHistory } from "@/components/mood-history"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, TrendingUp, Calendar, Heart } from "lucide-react"

export default async function MoodTrackerPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get recent mood entries
  const { data: moodEntries } = await supabase
    .from("mood_entries")
    .select("*")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })
    .limit(30)

  // Calculate stats
  const totalEntries = moodEntries?.length || 0
  const averageMood = moodEntries?.length
    ? Math.round((moodEntries.reduce((sum, entry) => sum + entry.mood_score, 0) / moodEntries.length) * 10) / 10
    : 0

  const thisWeekEntries =
    moodEntries?.filter((entry) => {
      const entryDate = new Date(entry.created_at)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return entryDate >= weekAgo
    }) || []

  const lastWeekEntries =
    moodEntries?.filter((entry) => {
      const entryDate = new Date(entry.created_at)
      const twoWeeksAgo = new Date()
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return entryDate >= twoWeeksAgo && entryDate < weekAgo
    }) || []

  const thisWeekAvg = thisWeekEntries.length
    ? thisWeekEntries.reduce((sum, entry) => sum + entry.mood_score, 0) / thisWeekEntries.length
    : 0
  const lastWeekAvg = lastWeekEntries.length
    ? lastWeekEntries.reduce((sum, entry) => sum + entry.mood_score, 0) / lastWeekEntries.length
    : 0

  const weeklyTrend = thisWeekAvg - lastWeekAvg

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Mood Tracker</h1>
          <p className="text-lg text-slate-600">
            Track your daily emotions and discover patterns in your mental wellness journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Entries</p>
                  <p className="text-2xl font-bold text-slate-800">{totalEntries}</p>
                  <p className="text-xs text-blue-600">Keep tracking!</p>
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
                  <p className="text-sm text-slate-600 mb-1">Average Mood</p>
                  <p className="text-2xl font-bold text-slate-800">{averageMood}/10</p>
                  <p className="text-xs text-green-600">Overall wellness</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">This Week</p>
                  <p className="text-2xl font-bold text-slate-800">{thisWeekEntries.length}</p>
                  <p className="text-xs text-purple-600">entries logged</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Weekly Trend</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {weeklyTrend > 0 ? "+" : ""}
                    {Math.round(weeklyTrend * 10) / 10}
                  </p>
                  <p className={`text-xs ${weeklyTrend >= 0 ? "text-green-600" : "text-orange-600"}`}>
                    {weeklyTrend >= 0 ? "Improving" : "Needs attention"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mood Entry Form */}
          <div className="lg:col-span-1">
            <MoodEntryForm userId={data.user.id} />
          </div>

          {/* Chart and History */}
          <div className="lg:col-span-2 space-y-8">
            <MoodChart moodEntries={moodEntries || []} />
            <MoodHistory moodEntries={moodEntries || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
