"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Wind } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "pause">("inhale")
  const [seconds, setSeconds] = useState(0)
  const [cycle, setCycle] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 4-7-8 breathing pattern (inhale 4, hold 7, exhale 8, pause 1)
  const phases = {
    inhale: { duration: 4, next: "hold" as const, instruction: "Breathe in slowly through your nose" },
    hold: { duration: 7, next: "exhale" as const, instruction: "Hold your breath gently" },
    exhale: { duration: 8, next: "pause" as const, instruction: "Exhale slowly through your mouth" },
    pause: { duration: 1, next: "inhale" as const, instruction: "Brief pause before next cycle" },
  }

  const currentPhase = phases[phase]
  const progress = (seconds / currentPhase.duration) * 100

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= currentPhase.duration - 1) {
            setPhase(currentPhase.next)
            if (phase === "pause") {
              setCycle((prev) => prev + 1)
            }
            return 0
          }
          return prev + 1
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
  }, [isActive, phase, currentPhase])

  const toggleExercise = () => {
    setIsActive(!isActive)
  }

  const resetExercise = () => {
    setIsActive(false)
    setPhase("inhale")
    setSeconds(0)
    setCycle(0)
  }

  const getCircleScale = () => {
    if (phase === "inhale") return 0.5 + (progress / 100) * 0.5
    if (phase === "hold") return 1
    if (phase === "exhale") return 1 - (progress / 100) * 0.5
    return 0.5
  }

  const getPhaseColor = () => {
    switch (phase) {
      case "inhale":
        return "bg-blue-500"
      case "hold":
        return "bg-purple-500"
      case "exhale":
        return "bg-green-500"
      case "pause":
        return "bg-slate-400"
    }
  }

  return (
    <Card className="border-0 shadow-lg max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-slate-800 flex items-center justify-center gap-2">
          <Wind className="w-6 h-6 text-blue-600" />
          4-7-8 Breathing Exercise
        </CardTitle>
        <p className="text-slate-600">A calming breathing technique to help reduce stress and anxiety</p>
      </CardHeader>

      <CardContent className="text-center space-y-8">
        {/* Breathing Circle */}
        <div className="relative w-64 h-64 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${getPhaseColor()}`}
            style={{
              transform: `scale(${getCircleScale()})`,
              opacity: 0.7,
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800 mb-2">{currentPhase.duration - seconds}</div>
              <div className="text-sm text-slate-600 capitalize font-medium">{phase}</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <p className="text-lg font-medium text-slate-800">{currentPhase.instruction}</p>
          <div className="text-sm text-slate-600">
            Cycle: {cycle} • Phase: {phase.charAt(0).toUpperCase() + phase.slice(1)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleExercise}
            className={`${isActive ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>

          <Button onClick={resetExercise} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 p-6 rounded-lg text-left">
          <h3 className="font-semibold text-slate-800 mb-3">How to use this exercise:</h3>
          <ol className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
            <li>Sit comfortably with your back straight</li>
            <li>Place one hand on your chest, one on your belly</li>
            <li>Follow the circle and breathing instructions</li>
            <li>Inhale through your nose for 4 counts</li>
            <li>Hold your breath for 7 counts</li>
            <li>Exhale through your mouth for 8 counts</li>
            <li>Repeat for 4-8 cycles or until you feel calmer</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
