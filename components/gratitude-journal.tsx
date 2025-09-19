"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Save, Sparkles } from "lucide-react"
import { useState } from "react"

export function GratitudeJournal() {
  const [entries, setEntries] = useState(["", "", ""])
  const [saved, setSaved] = useState(false)

  const updateEntry = (index: number, value: string) => {
    const newEntries = [...entries]
    newEntries[index] = value
    setEntries(newEntries)
  }

  const saveEntries = () => {
    // In a real app, this would save to a database
    localStorage.setItem(
      "gratitude-entries",
      JSON.stringify({
        entries,
        date: new Date().toISOString(),
      }),
    )
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const prompts = [
    "What made you smile today?",
    "Who are you grateful for and why?",
    "What's something good that happened recently?",
  ]

  const isComplete = entries.every((entry) => entry.trim().length > 0)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-slate-800 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-pink-600" />
            Today's Gratitude
          </CardTitle>
          <p className="text-slate-600">Write down three things you're grateful for today</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {entries.map((entry, index) => (
            <div key={index} className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                {prompts[index]}
              </label>
              <Textarea
                value={entry}
                onChange={(e) => updateEntry(index, e.target.value)}
                placeholder="Write your thoughts here..."
                rows={3}
                className="border-slate-200 focus:border-pink-400"
              />
            </div>
          ))}

          {saved && (
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">Your gratitude entries have been saved! ✨</p>
            </div>
          )}

          <div className="flex justify-center">
            <Button onClick={saveEntries} disabled={!isComplete} className="bg-pink-600 hover:bg-pink-700">
              <Save className="w-4 h-4 mr-2" />
              Save My Gratitude
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Benefits Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h3 className="text-xl font-semibold mb-3">Benefits of Gratitude Practice</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium mb-1">Better Sleep</div>
              <div className="opacity-90">Improves sleep quality and duration</div>
            </div>
            <div>
              <div className="font-medium mb-1">Reduced Stress</div>
              <div className="opacity-90">Lowers cortisol and anxiety levels</div>
            </div>
            <div>
              <div className="font-medium mb-1">Improved Mood</div>
              <div className="opacity-90">Increases happiness and life satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
