import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Users, Sparkles, MessageCircle, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 text-balance">
              Your Mental Wellness Journey Starts Here
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto text-pretty">
              A safe, supportive space designed specifically for young people aged 13-25. Track your mood, chat with AI
              support, and access resources to help you thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-slate-300 bg-transparent">
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Tools for Your Mental Health</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to understand, track, and improve your mental wellness in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Mood Tracking</h3>
                <p className="text-slate-600">
                  Monitor your daily emotions and identify patterns to better understand your mental health.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">AI Support Chat</h3>
                <p className="text-slate-600">
                  Get instant, confidential support from our AI companion trained in mental health guidance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Self-Care Tools</h3>
                <p className="text-slate-600">
                  Discover personalized self-care activities, breathing exercises, and mindfulness practices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Curated Resources</h3>
                <p className="text-slate-600">
                  Access articles, videos, and guides specifically chosen for young people's mental health.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Safe & Private</h3>
                <p className="text-slate-600">
                  Your data is encrypted and secure. We prioritize your privacy and confidentiality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Youth-Focused</h3>
                <p className="text-slate-600">
                  Designed specifically for ages 13-25, with content and features that speak to your experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Ready to Take Control of Your Mental Health?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Join thousands of young people who are already on their journey to better mental wellness.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MindfulYouth</span>
              </div>
              <p className="text-slate-400">
                Supporting young people's mental health with compassionate, accessible tools and resources.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/resources" className="hover:text-white">
                    Mental Health Articles
                  </Link>
                </li>
                <li>
                  <Link href="/self-care" className="hover:text-white">
                    Self-Care Tools
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Crisis Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency</h3>
              <p className="text-slate-400 text-sm mb-2">If you're in crisis, please reach out immediately:</p>
              <p className="text-white font-semibold">988 - Suicide & Crisis Lifeline</p>
              <p className="text-white font-semibold">Text HOME to 741741</p>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 MindfulYouth. Made with care for young people's mental health.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
