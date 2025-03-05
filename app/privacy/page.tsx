import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: January 28, 2025</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              At Syntax Studio, we take your privacy seriously. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-white mb-3">Personal Information</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Email address</li>
                  <li>Name</li>
                  <li>Profile information</li>
                  <li>Authentication data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-3">Usage Data</h3>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Browser type and version</li>
                  <li>Time spent on pages</li>
                  <li>Features accessed</li>
                  <li>Other diagnostic data</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              The security of your data is important to us. While we strive to use commercially
              acceptable means to protect your Personal Information, we cannot guarantee its
              absolute security. Any information you transmit to us is done at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed">
              We may employ third-party companies and individuals for the following reasons:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-3">
              <li>To facilitate our Service</li>
              <li>To provide the Service on our behalf</li>
              <li>To perform Service-related services</li>
              <li>To assist us in analyzing how our Service is used</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the "Last
              updated" date at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p>Email: <a href="mailto:privacy@syntaxstudio.com" className="text-blue-400 hover:text-blue-300">privacy@syntaxstudio.com</a></p>
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
