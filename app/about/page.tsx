import Link from "next/link"
import { ArrowLeft, Code2, Users, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">About Syntax Studio</h1>

        <div className="space-y-8">
          <section className="text-center max-w-2xl mx-auto">
            <Code2 className="h-12 w-12 mx-auto mb-4 text-primary" />
            <p className="text-gray-600">
              Syntax Studio is revolutionizing the way developers write and optimize code. Our AI-powered platform helps
              you write better code faster, with real-time analysis and intelligent suggestions.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <Users className="h-8 w-8 mb-4 text-primary" />
              <h2 className="font-semibold mb-2">Our Mission</h2>
              <p className="text-sm text-gray-600">
                To empower developers worldwide with intelligent tools that enhance their coding experience and
                productivity.
              </p>
            </Card>

            <Card className="p-6">
              <Shield className="h-8 w-8 mb-4 text-primary" />
              <h2 className="font-semibold mb-2">Our Values</h2>
              <p className="text-sm text-gray-600">
                We believe in open source, community collaboration, and making advanced development tools accessible to
                everyone.
              </p>
            </Card>

            <Card className="p-6">
              <Zap className="h-8 w-8 mb-4 text-primary" />
              <h2 className="font-semibold mb-2">Our Impact</h2>
              <p className="text-sm text-gray-600">
                Helping thousands of developers write cleaner, more efficient code and build better software.
              </p>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2025 by Priyanshu Sah, Syntax Studio began with a vision to make code optimization accessible
                to everyone. What started as a passion project has grown into a comprehensive platform used by
                developers worldwide.
              </p>
              <p>
                Our team of passionate developers and AI experts work tirelessly to improve and expand our services,
                always keeping the developer experience at the forefront of our decisions.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Leadership</h2>
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3B4371] to-[#F3904F] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  PS
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Priyanshu Sah</h3>
                  <p className="text-gray-600">CEO & Founder</p>
                </div>
              </div>
            </Card>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/" className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

