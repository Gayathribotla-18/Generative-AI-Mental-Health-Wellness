"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Heart, Home, MessageCircle, BarChart3, Sparkles, LogOut, UserIcon } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

export function Navigation() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/resources", icon: Heart, label: "Resources" },
    { href: "/self-care", icon: Sparkles, label: "Self-Care" },
    { href: "/contact", icon: MessageCircle, label: "Contact" },
  ]

  const dashboardItems = [
    { href: "/dashboard", icon: UserIcon, label: "Dashboard" },
    { href: "/mood-tracker", icon: BarChart3, label: "Mood Tracker" },
    { href: "/chat", icon: MessageCircle, label: "AI Support" },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">MindfulYouth</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            {user && (
              <>
                {dashboardItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <Button onClick={handleSignOut} variant="ghost" size="sm" className="text-slate-600 hover:text-red-600">
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </>
            )}

            {!user && (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="text-slate-600">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
