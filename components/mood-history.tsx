"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface MoodEntry {
  id: string
  mood_score: number
  notes: string | null
  created_at: string
}

interface MoodHistoryProps {
  moodEntries: MoodEntry[]
}

const moodLabels = {
  1: "Terrible",
  2: "Very Bad",
  3: "Bad",
  4: "Poor",
  5: "Okay",
  6: "Good",
  7: "Very Good",
  8: "Great",
  9: "Excellent",
  10: "Amazing",
}

const getMoodColor = (score: number) => {
  if (score <= 3) return "bg-red-100 text-red-700 border-red-200"
  if (score <= 5) return "bg-orange-100 text-orange-700 border-orange-200"
  if (score <= 7) return "bg-yellow-100 text-yellow-700 border-yellow-200"
  return "bg-green-100 text-green-700 border-green-200"
}

export function MoodHistory({ moodEntries }: MoodHistoryProps) {
  const recentEntries = moodEntries.slice(0, 10)

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800">Recent Entries</CardTitle>
        <p className="text-slate-600 text-sm">Your latest mood entries and notes</p>
      </CardHeader>
      <CardContent>
        {recentEntries.length > 0 ? (
          <div className="space-y-4">
            {recentEntries.map((entry) => (
              <div key={entry.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getMoodColor(entry.mood_score)} border`}>
                      {entry.mood_score}/10 - {moodLabels[entry.mood_score as keyof typeof moodLabels]}
                    </Badge>
                  </div>
                  <span className="text-sm text-slate-500">
                    {format(new Date(entry.created_at), "MMM dd, yyyy 'at' h:mm a")}
                  </span>
                </div>
                {entry.notes && <p className="text-slate-700 text-sm leading-relaxed mt-2">"{entry.notes}"</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p className="text-lg font-medium mb-2">No entries yet</p>
            <p className="text-sm">Start by logging your first mood entry!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
