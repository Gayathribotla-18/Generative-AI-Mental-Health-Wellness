"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format } from "date-fns"

interface MoodEntry {
  id: string
  mood_score: number
  notes: string | null
  created_at: string
}

interface MoodChartProps {
  moodEntries: MoodEntry[]
}

export function MoodChart({ moodEntries }: MoodChartProps) {
  // Prepare data for chart (last 14 days)
  const chartData = moodEntries
    .slice(0, 14)
    .reverse()
    .map((entry) => ({
      date: format(new Date(entry.created_at), "MMM dd"),
      mood: entry.mood_score,
      fullDate: entry.created_at,
    }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-800">{label}</p>
          <p className="text-blue-600">
            Mood: <span className="font-semibold">{payload[0].value}/10</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800">Mood Trends</CardTitle>
        <p className="text-slate-600 text-sm">Your mood patterns over the last 14 days</p>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis domain={[1, 10]} stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#2563eb", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">No mood data yet</p>
              <p className="text-sm">Start tracking your mood to see trends here!</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
