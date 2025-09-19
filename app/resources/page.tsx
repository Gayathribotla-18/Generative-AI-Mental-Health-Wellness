import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Video, Headphones, ExternalLink } from "lucide-react"

export default function ResourcesPage() {
  const resources = [
    {
      id: 1,
      title: "Understanding Anxiety in Young Adults",
      type: "Article",
      category: "Anxiety",
      description: "Learn about common anxiety symptoms and coping strategies specifically for young people.",
      readTime: "5 min read",
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Mindfulness for Beginners",
      type: "Video",
      category: "Mindfulness",
      description: "A gentle introduction to mindfulness practices that can help reduce stress and improve focus.",
      readTime: "12 min watch",
      icon: Video,
    },
    {
      id: 3,
      title: "Sleep Hygiene for Better Mental Health",
      type: "Article",
      category: "Sleep",
      description: "Discover how improving your sleep can significantly impact your mental wellness.",
      readTime: "7 min read",
      icon: BookOpen,
    },
    {
      id: 4,
      title: "Guided Meditation for Stress Relief",
      type: "Audio",
      category: "Meditation",
      description: "A 10-minute guided meditation to help you relax and manage daily stress.",
      readTime: "10 min listen",
      icon: Headphones,
    },
    {
      id: 5,
      title: "Building Healthy Relationships",
      type: "Video",
      category: "Relationships",
      description: "Tips for maintaining healthy friendships and family relationships during challenging times.",
      readTime: "15 min watch",
      icon: Video,
    },
    {
      id: 6,
      title: "Coping with Academic Pressure",
      type: "Article",
      category: "Stress",
      description: "Strategies for managing school or work stress without compromising your mental health.",
      readTime: "6 min read",
      icon: BookOpen,
    },
  ]

  const categories = ["All", "Anxiety", "Depression", "Stress", "Mindfulness", "Sleep", "Relationships"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Mental Health Resources</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            Curated articles, videos, and tools to support your mental wellness journey. All content is reviewed by
            mental health professionals and tailored for young people.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input placeholder="Search resources..." className="pl-10 border-slate-200 focus:border-blue-400" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Search</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "secondary"}
                className="cursor-pointer hover:bg-blue-100 hover:text-blue-700"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card key={resource.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <resource.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {resource.type}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-slate-800 leading-tight">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {resource.category}
                    </Badge>
                    <span className="text-xs text-slate-500">{resource.readTime}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Crisis Resources */}
        <div className="mt-16 bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-4">Need Immediate Help?</h2>
          <p className="text-red-700 mb-4">
            If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out for
            immediate support:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Crisis Text Line</h3>
              <p className="text-slate-600 text-sm mb-2">Text HOME to 741741</p>
              <p className="text-slate-500 text-xs">Free, 24/7 crisis support via text</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Suicide & Crisis Lifeline</h3>
              <p className="text-slate-600 text-sm mb-2">Call or text 988</p>
              <p className="text-slate-500 text-xs">Free, confidential support 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
