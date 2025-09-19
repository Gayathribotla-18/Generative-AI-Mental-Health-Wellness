"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface MoodEntryFormProps {
  userId: string
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

const moodColors = {
  1: "bg-red-500",
  2: "bg-red-400",
  3: "bg-orange-500",
  4: "bg-orange-400",
  5: "bg-yellow-500",
  6: "bg-yellow-400",
  7: "bg-lime-500",
  8: "bg-green-500",
  9: "bg-green-600",
  10: "bg-emerald-600",
}

export function MoodEntryForm({ userId }: MoodEntryFormProps) {
  const [moodScore, setMoodScore] = useState([5])
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await supabase.from("mood_entries").insert({
        user_id: userId,
        mood_score: moodScore[0],
        notes: notes.trim() || null,
      })

      if (error) throw error

      setSuccess(true)
      setNotes("")
      setMoodScore([5])

      // Refresh the page to show new data
      router.refresh()

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const currentMood = moodScore[0]
  const moodLabel = moodLabels[currentMood as keyof typeof moodLabels]
  const moodColor = moodColors[currentMood as keyof typeof moodColors]

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800">How are you feeling today?</CardTitle>
        <p className="text-slate-600 text-sm">Rate your mood and add any notes about your day.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Slider */}
          <div className="space-y-4">
            <Label className="text-slate-700 font-medium">Mood Level</Label>
            <div className="text-center mb-4">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${moodColor} text-white font-bold text-lg mb-2`}
              >
                {currentMood}
              </div>
              <p className="text-lg font-semibold text-slate-800">{moodLabel}</p>
            </div>
            <Slider value={moodScore} onValueChange={setMoodScore} max={10} min={1} step={1} className="w-full" />
            <div className="flex justify-between text-xs text-slate-500">
              <span>1 - Terrible</span>
              <span>10 - Amazing</span>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-700 font-medium">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="What's on your mind? Any thoughts about your day..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="border-slate-200 focus:border-blue-400"
            />
          </div>

          {/* Error/Success Messages */}
          {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

          {success && (
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">Mood entry saved successfully! 🎉</div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Mood Entry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
