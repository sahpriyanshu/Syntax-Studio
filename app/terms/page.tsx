import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-6">
          Welcome to Syntax Studio, your AI-powered code optimization platform. By using our service, you agree to
          comply with and be bound by the following terms and conditions. Please read them carefully before using our
          platform. These terms govern your use of our website, services, and any content or features we provide.
        </p>
        <div className="space-y-4 text-sm">
          <p>Welcome to Syntax Studio. By using our service, you agree to these terms.</p>
          <h2 className="text-xl font-semibold">1. Use of Service</h2>
          <p>You must use Syntax Studio in compliance with all applicable laws and regulations.</p>
          <h2 className="text-xl font-semibold">2. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account and password.</p>
          <h2 className="text-xl font-semibold">3. Intellectual Property</h2>
          <p>The content and software on Syntax Studio are protected by intellectual property laws.</p>
          <h2 className="text-xl font-semibold">4. Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to our service immediately, without prior notice or
            liability, for any reason whatsoever.
          </p>
          <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
          <p>
            In no event shall Syntax Studio be liable for any indirect, incidental, special, consequential or punitive
            damages.
          </p>
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

