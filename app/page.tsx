"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Terminal,
  Cpu,
  Code2,
  Workflow,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  Zap,
  Shield,
  FileCode,
  Coffee,
  Hash,
  Braces,
  GemIcon as Ruby,
  Codesandbox,
  Globe,
  Layout,
  Smartphone,
  PenTool,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect } from "react"

const FeatureCard = ({ icon: Icon, title, description, items }) => {
  return (
    <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} whileTap={{ scale: 0.95 }}>
      <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-white/10 backdrop-blur text-white">
        <Icon className="w-12 h-12 mb-4 text-[#F3904F]" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/80 mb-4">{description}</p>
        <ul className="text-sm text-white/70 space-y-2">
          {items.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </Card>
    </motion.div>
  )
}

const LanguageCard = ({ title, description, href, color = "border-blue-500", icon: Icon }) => {
  return (
    <Link href={href} className={`block p-4 border-2 ${color} rounded-lg hover:bg-white/5 transition-colors`}>
      <div className="flex items-center mb-2">
        <Icon className="h-6 w-6 mr-2 text-white" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-white/70">{description}</p>
    </Link>
  )
}

export default function LandingPage() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F]">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="text-center lg:text-left space-y-8 lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-8"
            >
              <Code2 className="h-12 w-12 text-white" />
              <h1 className="text-4xl font-bold text-white">Syntax Studio</h1>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Code & Create with Confidence
            </motion.h2>
            <motion.p
              className="text-xl text-white/80 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Experience our dual-powered platform: AI-driven code optimization and a feature-rich web playground for
              modern development.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" className="bg-white text-[#3B4371] hover:bg-white/90" asChild>
                <Link href="/code-workspace">
                  <Terminal className="mr-2 h-5 w-5" />
                  Code Workspace
                </Link>
              </Button>
              <Button size="lg" className="bg-white text-[#3B4371] hover:bg-white/90" asChild>
                <Link href="/web-playground">
                  <Globe className="mr-2 h-5 w-5" />
                  Web Playground
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="lg:w-1/2 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateZ: [-1, 1, -1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5,
                ease: "easeInOut",
              }}
            >
              <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-white shadow-xl">
                <pre className="language-javascript">
                  <code>
                    {`function optimizeCode(code) {
  const ai = new SyntaxStudio();
  const optimizedCode = ai.analyze(code);
  return ai.suggest(optimizedCode);
}

// Your code, but better
const result = optimizeCode(yourCode);
console.log(result); // Optimized code`}
                  </code>
                </pre>
              </Card>
            </motion.div>
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateZ: [1, -1, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4,
                delay: 0.5,
                ease: "easeInOut",
              }}
            >
              <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    <span className="font-semibold">Web Playground</span>
                  </div>
                  <div className="flex gap-2">
                    <Layout className="h-4 w-4" />
                    <Smartphone className="h-4 w-4" />
                  </div>
                </div>
                <pre className="language-html">
                  <code>
                    {`<!DOCTYPE html>
<html>
<head>
  <title>My Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Welcome!</h1>
  </div>
  <script src="script.js"></script>
</body>
</html>`}
                  </code>
                </pre>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Language Selection Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Choose your programming language</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Our free online code editor supports all the major programming languages. Pick a language to get started!
          </p>
        </motion.div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Most Popular</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <LanguageCard
                title="Python Compiler"
                description="Write and run Python code with our online compiler"
                href="/code-workspace?language=python"
                color="border-blue-500"
                icon={FileCode}
              />
              <LanguageCard
                title="Java Compiler"
                description="Compile and run Java programs in your browser"
                href="/code-workspace?language=java"
                color="border-orange-500"
                icon={Coffee}
              />
              <LanguageCard
                title="JavaScript Compiler"
                description="Test and run JavaScript code instantly"
                href="/code-workspace?language=javascript"
                color="border-yellow-500"
                icon={Braces}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Other Languages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <LanguageCard
                title="C++ Compiler"
                description="Write, compile and run C++ code online"
                href="/code-workspace?language=cpp"
                color="border-purple-500"
                icon={Hash}
              />
              <LanguageCard
                title="C# Compiler"
                description="Develop C# applications in your browser"
                href="/code-workspace?language=csharp"
                color="border-green-500"
                icon={Hash}
              />
              <LanguageCard
                title="TypeScript Compiler"
                description="Write and compile TypeScript code online"
                href="/code-workspace?language=typescript"
                color="border-blue-400"
                icon={Braces}
              />
              <LanguageCard
                title="PHP Compiler"
                description="Run PHP scripts directly in your browser"
                href="/code-workspace?language=php"
                color="border-indigo-500"
                icon={FileCode}
              />
              <LanguageCard
                title="Ruby Compiler"
                description="Write and execute Ruby code online"
                href="/code-workspace?language=ruby"
                color="border-red-500"
                icon={Ruby}
              />
              <LanguageCard
                title="Go Compiler"
                description="Build and run Go programs instantly"
                href="/code-workspace?language=go"
                color="border-cyan-500"
                icon={Codesandbox}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Two Powerful Tools</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Choose the perfect environment for your development needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-white/10 backdrop-blur text-white hover:transform hover:scale-105 transition-transform">
            <Terminal className="w-12 h-12 mb-6 text-[#F3904F]" />
            <h3 className="text-2xl font-bold mb-4">Code Workspace</h3>
            <p className="text-white/80 mb-6">
              AI-powered code optimization and compilation environment for multiple programming languages.
            </p>
            <ul className="space-y-3 mb-6 text-white/70">
              <li className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Multi-language support
              </li>
              <li className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                AI code analysis
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Real-time compilation
              </li>
            </ul>
            <Button className="w-full bg-white text-[#3B4371] hover:bg-white/90" asChild>
              <Link href="/code-workspace">
                Open Workspace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="p-8 bg-white/10 backdrop-blur text-white hover:transform hover:scale-105 transition-transform">
            <Globe className="w-12 h-12 mb-6 text-[#F3904F]" />
            <h3 className="text-2xl font-bold mb-4">Web Playground</h3>
            <p className="text-white/80 mb-6">
              Interactive web development environment with live preview and responsive testing.
            </p>
            <ul className="space-y-3 mb-6 text-white/70">
              <li className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Responsive preview
              </li>
              <li className="flex items-center gap-2">
                <PenTool className="h-5 w-5" />
                Multiple file support
              </li>
              <li className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Easy sharing
              </li>
            </ul>
            <Button className="w-full bg-white text-[#3B4371] hover:bg-white/90" asChild>
              <Link href="/web-playground">
                Open Playground
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Syntax Studio streamlines your coding process in three simple steps
          </p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/10 backdrop-blur text-white">
            <div className="text-4xl font-bold text-[#F3904F] mb-4">1</div>
            <h3 className="text-xl font-bold mb-2">Open Your Workspace</h3>
            <p className="text-white/80">
              Start by opening your personalized workspace, featuring our intuitive code editor that supports multiple
              programming languages.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/10 backdrop-blur text-white">
            <div className="text-4xl font-bold text-[#F3904F] mb-4">2</div>
            <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
            <p className="text-white/80">
              Our AI engine analyzes your code, identifying potential improvements and optimizations.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/10 backdrop-blur text-white">
            <div className="text-4xl font-bold text-[#F3904F] mb-4">3</div>
            <h3 className="text-xl font-bold mb-2">Optimize and Learn</h3>
            <p className="text-white/80">
              Receive suggestions and learn best practices to enhance your coding skills and efficiency.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Why Choose Syntax Studio?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover the advantages that set Syntax Studio apart
          </p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/10 backdrop-blur text-white">
            <Cpu className="w-12 h-12 mb-4 text-[#F3904F]" />
            <h3 className="text-xl font-bold mb-2">Advanced Code Analysis</h3>
            <p className="text-white/80">
              Benefit from in-depth code analysis to identify potential improvements and optimizations.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/10 backdrop-blur text-white">
            <Zap className="w-12 h-12 mb-4 text-[#F3904F]" />
            <h3 className="text-xl font-bold mb-2">Increased Productivity</h3>
            <p className="text-white/80">
              Boost your coding efficiency with AI-powered suggestions and automated optimizations.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/10 backdrop-blur text-white">
            <Shield className="w-12 h-12 mb-4 text-[#F3904F]" />
            <h3 className="text-xl font-bold mb-2">Enhanced Code Quality</h3>
            <p className="text-white/80">
              Improve your code's reliability and performance with our advanced analysis tools.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* Best Experience Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">For the Best Experience</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            To fully utilize Syntax Studio's powerful features, we recommend using it on a desktop or PC. Our advanced
            interface is optimized for larger screens, providing you with the most immersive and productive coding
            environment.
          </p>
          <div className="flex justify-center">
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-white max-w-md">
              <h3 className="text-xl font-bold mb-2">Recommended Setup</h3>
              <ul className="text-left space-y-2">
                <li>• Desktop or laptop computer</li>
                <li>• Large display (1080p or higher resolution)</li>
                <li>• Modern web browser (Chrome, Firefox, Safari, or Edge)</li>
                <li>• Stable internet connection</li>
              </ul>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Elevate Your Coding Experience?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join developers worldwide who trust Syntax Studio for their coding needs.
          </p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="bg-white text-[#3B4371] hover:bg-white/90" asChild>
              <Link href="/code-workspace">
                Open Workspace <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" className="bg-white text-[#3B4371] hover:bg-white/90" asChild>
              <Link href="/web-playground">
                Open Playground <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="bg-black text-white hover:bg-black/90" asChild>
              <Link href="/signup">
                Sign Up for Free
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
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
                  Code Workspace
                </Link>
              </li>
              <li>
                <Link href="/web-playground" className="hover:underline">
                  Web Playground
                </Link>
              </li>
              <li>
                <Link href="/web-playground#templates" className="hover:underline">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:underline">
                  Roadmap
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
              &copy; 2025{" "}
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
    </div>
  )
}
