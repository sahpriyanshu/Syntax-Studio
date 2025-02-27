import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <div className="space-y-6 text-sm">
          <p className="text-gray-600">Last updated: January 28, 2024</p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p>
              At Syntax Studio, we take your privacy seriously. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <div className="space-y-2">
              <h3 className="font-medium">Personal Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Email address</li>
                <li>Name</li>
                <li>Usage data</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Providing and maintaining our Service</li>
              <li>Notifying you about changes to our Service</li>
              <li>Providing customer support</li>
              <li>Analyzing usage to improve our Service</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of
              transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Third-Party Services</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our Service, provide the Service on our
              behalf, or assist us in analyzing how our Service is used.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <ul className="list-disc pl-5">
              <li>Email: privacy@syntaxstudio.com</li>
              <li>Address: 123 Code Street, Developer City, DC 12345</li>
            </ul>
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

