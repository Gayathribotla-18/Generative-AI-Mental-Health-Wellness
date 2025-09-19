import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Wind, Heart, Smile, Moon, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SelfCarePage() {
  const activities = [
    {
      id: 1,
      title: "5-Minute Breathing Exercise",
      description: "A simple breathing technique to help you feel calm and centered.",
      duration: "5 minutes",
      difficulty: "Beginner",
      category: "Breathing",
      icon: Wind,
      color: "bg-blue-100 text-blue-600",
      href: "/self-care/breathing",
    },
    {
      id: 2,
      title: "Gratitude Journaling",
      description: "Write down three things you're grateful for today.",
      duration: "10 minutes",
      difficulty: "Beginner",
      category: "Mindfulness",
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
      href: "/self-care/gratitude",
    },
    {
      id: 3,
      title: "Guided Meditation",
      description: "A peaceful meditation session to help you find inner calm.",
      duration: "5-20 minutes",
      difficulty: "Beginner",
      category: "Meditation",
      icon: Zap,
      color: "bg-purple-100 text-purple-600",
      href: "/self-care/meditation",
    },
    {
      id: 4,
      title: "Mood Boosting Playlist",
      description: "Listen to uplifting music curated for mental wellness.",
      duration: "20 minutes",
      difficulty: "Beginner",
      category: "Music",
      icon: Smile,
      color: "bg-yellow-100 text-yellow-600",
      href: "#",
    },
    {
      id: 5,
      title: "Evening Wind-Down Routine",
      description: "A calming routine to help you prepare for restful sleep.",
      duration: "30 minutes",
      difficulty: "Beginner",
      category: "Sleep",
      icon: Moon,
      color: "bg-indigo-100 text-indigo-600",
      href: "#",
    },
    {
      id: 6,
      title: "Mindful Walking",
      description: "Take a slow, intentional walk while focusing on your surroundings.",
      duration: "15 minutes",
      difficulty: "Beginner",
      category: "Movement",
      icon: Sparkles,
      color: "bg-green-100 text-green-600",
      href: "#",
    },
  ]

  const quickTools = [
    { name: "Box Breathing", time: "2 min", action: "Start", href: "/self-care/breathing" },
    { name: "Body Scan", time: "5 min", action: "Begin", href: "/self-care/meditation" },
    { name: "Positive Affirmations", time: "3 min", action: "Listen", href: "#" },
    { name: "Stress Ball", time: "1 min", action: "Squeeze", href: "#" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Self-Care Tools</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            Take a moment for yourself with these guided activities designed to help you relax, recharge, and build
            healthy coping skills.
          </p>
        </div>

        {/* Quick Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Quick Relief Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickTools.map((tool, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium text-slate-800 mb-1">{tool.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{tool.time}</p>
                  {tool.href !== "#" ? (
                    <Link href={tool.href}>
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                        {tool.action}
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      {tool.action}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Self-Care Activities */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Self-Care Activities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${activity.color}`}>
                      <activity.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-slate-800">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{activity.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {activity.duration}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {activity.difficulty}
                      </Badge>
                    </div>
                  </div>
                  {activity.href !== "#" ? (
                    <Link href={activity.href}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 group">
                        Start Activity
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Activity</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-8 text-white">
          <div className="text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-semibold mb-4">Get Personalized Recommendations</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Sign up to receive self-care activities tailored to your mood, preferences, and goals. Track your progress
              and build healthy habits that work for you.
            </p>
            <Link href="/auth/signup">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Create Your Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
