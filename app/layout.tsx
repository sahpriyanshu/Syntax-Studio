'use client'

import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { Navigation } from "./components/navigation"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster"
import { LandingGlowCursor } from "./components/landing-glow-cursor"
import type React from "react"  
import './globals.css'
import './styles.css'

const inter = Inter({ subsets: ["latin"] })

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navigation />
      {children}
      <Toaster />
      <LandingGlowCursor />
    </SessionProvider>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
