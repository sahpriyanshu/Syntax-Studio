import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: January 28, 2025</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to Syntax Studio, your AI-powered code optimization platform. By using our service, you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use of Service</h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Our service provides an AI-powered code optimization platform. You agree to use this service only for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Legal and authorized purposes</li>
                <li>Following our community guidelines</li>
                <li>Respecting intellectual property rights</li>
                <li>Not attempting to breach security measures</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">When creating an account, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Not share your account credentials</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                The service and its original content, features, and functionality are owned by Syntax Studio and are protected by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>International copyright laws</li>
                <li>Trademark laws</li>
                <li>Other intellectual property rights</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. User Content</h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                When you create or upload content to Syntax Studio:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You retain your intellectual property rights</li>
                <li>You grant us a license to use and display the content</li>
                <li>You are responsible for the content you share</li>
                <li>Content must not violate any laws or rights</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Termination</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to terminate or suspend access to our service immediately, without prior notice 
              or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              In no event shall Syntax Studio, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential or punitive damages, including without 
              limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify or replace these terms at any time. If a revision is material, we will 
              try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p>Email: <a href="mailto:terms@syntaxstudio.com" className="text-blue-400 hover:text-blue-300">terms@syntaxstudio.com</a></p>
              <p>Twitter: <a href="https://twitter.com/syntaxstudio" className="text-blue-400 hover:text-blue-300">@syntaxstudio</a></p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <a
            href="/"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
