import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageCircle, AlertTriangle, Clock, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Contact & Support</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            We're here to help. Reach out for support, ask questions, or get in touch with our team.
          </p>
        </div>

        {/* Crisis Alert */}
        <div className="mb-12 bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-red-800 mb-2">In Crisis? Get Immediate Help</h2>
              <p className="text-red-700 mb-4">
                If you're having thoughts of self-harm or suicide, please reach out for immediate support. You're not
                alone.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="flex items-center mb-2">
                    <Phone className="w-4 h-4 text-red-600 mr-2" />
                    <span className="font-semibold text-red-800">Crisis Lifeline</span>
                  </div>
                  <p className="text-red-700 font-bold text-lg">988</p>
                  <p className="text-red-600 text-sm">Call or text • Available 24/7</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="flex items-center mb-2">
                    <MessageCircle className="w-4 h-4 text-red-600 mr-2" />
                    <span className="font-semibold text-red-800">Crisis Text Line</span>
                  </div>
                  <p className="text-red-700 font-bold text-lg">Text HOME to 741741</p>
                  <p className="text-red-600 text-sm">Free crisis support via text</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">Send Us a Message</CardTitle>
                <p className="text-slate-600">Have a question or need support? We typically respond within 24 hours.</p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-700">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Your first name"
                        className="border-slate-200 focus:border-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-700">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Your last name"
                        className="border-slate-200 focus:border-blue-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="border-slate-200 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-slate-700">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      className="border-slate-200 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className="border-slate-200 focus:border-blue-400"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Email Support</p>
                    <p className="text-slate-600">support@mindfulyouth.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Response Time</p>
                    <p className="text-slate-600">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Location</p>
                    <p className="text-slate-600">Available nationwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Additional Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">National Suicide Prevention Lifeline</h3>
                  <p className="text-blue-700 text-sm mb-2">24/7 free and confidential support</p>
                  <p className="text-blue-800 font-bold">988</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Crisis Text Line</h3>
                  <p className="text-green-700 text-sm mb-2">Text-based crisis support</p>
                  <p className="text-green-800 font-bold">Text HOME to 741741</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">SAMHSA National Helpline</h3>
                  <p className="text-purple-700 text-sm mb-2">Treatment referral service</p>
                  <p className="text-purple-800 font-bold">1-800-662-4357</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
