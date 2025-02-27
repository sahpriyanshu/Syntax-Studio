import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#3B4371] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Syntax Studio</h3>
          <p className="text-sm text-white/70">
            Empowering developers with intelligent code tools and AI-driven optimization.
          </p>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/code-workspace" className="hover:underline">
                💻 Code Workspace
              </Link>
            </li>
            <li>
              <Link href="/web-playground" className="hover:underline">
                🌐 Web Playground
              </Link>
            </li>
            <li>
              <Link href="/web-playground#templates" className="hover:underline">
                ✨ Templates
              </Link>
            </li>
            <li>
              <Link href="/roadmap" className="hover:underline">
                🗺️ Roadmap
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/community" className="hover:underline">
                Community
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <p className="text-sm text-white/70">
            2025{" "}
            <Link href="/" className="hover:underline">
              Syntax Studio
            </Link>
            . All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="https://github.com/syntax-studio" className="text-white hover:text-[#F3904F]">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com/syntax-studio" className="text-white hover:text-[#F3904F]">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com/company/syntax-studio" className="text-white hover:text-[#F3904F]">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
