import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">Check Your Email</CardTitle>
            <CardDescription className="text-slate-600">We've sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-slate-600 leading-relaxed">
              Please check your email and click the confirmation link to activate your account. Once confirmed, you can
              sign in and start your mental wellness journey.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
