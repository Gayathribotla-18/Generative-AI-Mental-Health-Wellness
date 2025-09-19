import { Navigation } from "@/components/navigation"
import { MeditationTimer } from "@/components/meditation-timer"

export default function MeditationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Guided Meditation</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Take time to quiet your mind and find inner peace with this guided meditation session.
          </p>
        </div>

        <MeditationTimer />
      </div>
    </div>
  )
}
