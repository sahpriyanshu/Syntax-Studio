import Link from "next/link"
import { ArrowLeft, Users, MessageSquare, Github, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Community</h1>

        <div className="space-y-8">
          <section className="text-center max-w-2xl mx-auto">
            <p className="text-gray-600">
              Join our growing community of developers. Share your knowledge, learn from others, and help shape the
              future of Syntax Studio.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="font-semibold mb-2">Discussion Forums</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Engage with other developers, share ideas, and get help with your projects.
                  </p>
                  <Button variant="outline" className="w-full">
                    Join Discussions
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <MessageSquare className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="font-semibold mb-2">Discord Community</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Chat in real-time with other developers and get instant help.
                  </p>
                  <Button variant="outline" className="w-full">
                    Join Discord
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Github className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="font-semibold mb-2">Open Source</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Contribute to our open source projects and help improve Syntax Studio.
                  </p>
                  <Button variant="outline" className="w-full">
                    View GitHub
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Award className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="font-semibold mb-2">Community Showcase</h2>
                  <p className="text-sm text-gray-600 mb-4">See featured projects and share your own creations.</p>
                  <Button variant="outline" className="w-full">
                    View Showcase
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Upcoming Events</h2>
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-medium">Monthly Community Meetup</h3>
                <p className="text-sm text-gray-600">February 1, 2024 - Virtual</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-medium">Code Review Workshop</h3>
                <p className="text-sm text-gray-600">February 15, 2024 - Virtual</p>
              </Card>
            </div>
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

