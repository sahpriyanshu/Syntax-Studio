import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function RoadmapPage() {
  const roadmapItems = [
    {
      quarter: "Q1 2025",
      title: "Foundation and Core Features",
      items: [
        "Launch of multi-language code compilation",
        "Basic AI code analysis",
        "User authentication system",
        "Basic code sharing functionality",
      ],
      status: "completed",
    },
    {
      quarter: "Q2 2025",
      title: "Enhanced AI Integration",
      items: [
        "Advanced code optimization suggestions",
        "Real-time collaboration features",
        "Code performance analytics",
        "Extended language support",
      ],
      status: "in-progress",
    },
    {
      quarter: "Q3 2025",
      title: "Developer Tools and Integration",
      items: [
        "GitHub integration",
        "Custom theme support",
        "API access for developers",
        "Advanced code debugging tools",
      ],
      status: "planned",
    },
    {
      quarter: "Q4 2025",
      title: "Enterprise Features",
      items: [
        "Team collaboration tools",
        "Private workspaces",
        "Custom deployment options",
        "Advanced security features",
      ],
      status: "planned",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Product Roadmap</h1>
        <p className="text-center text-gray-600 mb-8">
          Our vision for the future of Syntax Studio. Here's what we're working on and what's coming next.
        </p>

        <div className="space-y-8">
          {roadmapItems.map((item, index) => (
            <Card key={index} className="p-6 relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-2 h-full ${
                  item.status === "completed"
                    ? "bg-green-500"
                    : item.status === "in-progress"
                      ? "bg-blue-500"
                      : "bg-gray-300"
                }`}
              />
              <div className="ml-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{item.quarter}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : item.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
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

