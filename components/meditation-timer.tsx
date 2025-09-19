"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, Brain } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function MeditationTimer() {
  const [duration, setDuration] = useState(5) // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60) // seconds
  const [isActive, setIsActive] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const meditations = [
    { value: 3, label: "3 minutes - Quick Reset" },
    { value: 5, label: "5 minutes - Mindful Moment" },
    { value: 10, label: "10 minutes - Deep Relaxation" },
    { value: 15, label: "15 minutes - Extended Practice" },
    { value: 20, label: "20 minutes - Full Session" },
  ]

  const guidedSteps = [
    { time: 0, instruction: "Find a comfortable seated position and close your eyes" },
    { time: 30, instruction: "Take three deep breaths, inhaling through your nose" },
    { time: 60, instruction: "Notice your natural breathing rhythm" },
    { time: 120, instruction: "If your mind wanders, gently return focus to your breath" },
    { time: 180, instruction: "Scan your body from head to toe, releasing any tension" },
    { time: 240, instruction: "Continue breathing mindfully, staying present" },
  ]

  const getCurrentInstruction = () => {
    const elapsed = duration * 60 - timeLeft
    const currentStep = guidedSteps.filter((step) => elapsed >= step.time).pop()
    return currentStep?.instruction || "Focus on your breath and stay present"
  }

  useEffect(() => {
    setTimeLeft(duration * 60)
    setIsComplete(false)
  }, [duration])

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false)
            setIsComplete(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(duration * 60)
    setIsComplete(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-slate-800 flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Mindfulness Meditation
          </CardTitle>
          <p className="text-slate-600">A guided meditation to help you find calm and clarity</p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Duration Selector */}
          {!isActive && !isComplete && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Choose your meditation duration:</label>
              <Select value={duration.toString()} onValueChange={(value) => setDuration(Number.parseInt(value))}>
                <SelectTrigger className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {meditations.map((med) => (
                    <SelectItem key={med.value} value={med.value.toString()}>
                      {med.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Timer Display */}
          <div className="text-center space-y-4">
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#8b5cf6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-800">{formatTime(timeLeft)}</div>
                  <div className="text-sm text-slate-600">
                    {isComplete ? "Complete!" : isActive ? "Meditating" : "Ready"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guided Instructions */}
          {(isActive || isComplete) && (
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <p className="text-purple-800 font-medium">
                {isComplete ? "Well done! Take a moment to notice how you feel." : getCurrentInstruction()}
              </p>
            </div>
          )}

          {/* Completion Message */}
          {isComplete && (
            <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Meditation Complete! 🧘‍♀️</h3>
              <p className="text-green-700">
                You've completed {duration} minutes of mindfulness meditation. Notice any changes in how you feel.
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleTimer}
              disabled={isComplete}
              className={`${isActive ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}`}
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  {timeLeft === duration * 60 ? "Start" : "Resume"}
                </>
              )}
            </Button>

            <Button onClick={resetTimer} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Meditation Tips:</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• Find a quiet space where you won't be disturbed</li>
            <li>• Sit comfortably with your back straight</li>
            <li>• It's normal for your mind to wander - gently return focus to your breath</li>
            <li>• Start with shorter sessions and gradually increase duration</li>
            <li>• Try to meditate at the same time each day to build a habit</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
