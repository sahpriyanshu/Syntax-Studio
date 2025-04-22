"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Code2, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/login";
  }

  const handleSignup = () => {
    window.location.href = "http://localhost:3000/signup"
  }

  const NavItems = () => (
    <div className="flex flex-col space-y-4">
      <Link
        href="/code-workspace"
        className="flex items-center gap-2 text-[15px] font-medium text-gray-200 hover:text-white"
      >
        <span className="w-5 text-center">💻</span>
        Code Workspace
      </Link>
      <Link
        href="/web-playground"
        className="flex items-center gap-2 text-[15px] font-medium text-gray-200 hover:text-white"
      >
        <span className="w-5 text-center">🌐</span>
        Web Playground
      </Link>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-gray-800">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center gap-2 font-medium text-white">
            <Code2 className="h-5 w-5" />
            <span>Syntax Studio</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-6">
          <Link
            href="/code-workspace"
            className="flex items-center gap-2 text-[15px] font-medium text-gray-200 hover:text-white"
          >
            <span className="w-5 text-center">💻</span>
            Code Workspace
          </Link>
          <Link
            href="/web-playground"
            className="flex items-center gap-2 text-[15px] font-medium text-gray-200 hover:text-white"
          >
            <span className="w-5 text-center">🌐</span>
            Web Playground
          </Link>
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full p-0 ring-2 ring-zinc-800 hover:ring-zinc-700"
                >
                  {session?.user?.image ? (
                    <img
                      className="rounded-full h-10 w-10 object-cover"
                      src={session.user.image}
                      alt={session.user.name || "User avatar"}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="rounded-full h-10 w-10 bg-zinc-800 flex items-center justify-center text-white">
                      {session?.user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 bg-zinc-900 border border-zinc-800 text-white" 
                align="end" 
                sideOffset={8}
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-white leading-none">{session?.user?.name}</p>
                    <p className="text-xs text-zinc-400 leading-none">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                
                <DropdownMenuItem
                  className="cursor-pointer text-white hover:bg-zinc-800 focus:bg-zinc-800"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="ghost"
                onClick={handleLogin}
                className="text-[15px] font-medium text-gray-200 hover:text-white"
              >
                Sign In
              </Button>
              <Button 
                variant="default"
                onClick={handleSignup}
                className="bg-white text-black hover:bg-gray-100 text-[15px] font-medium px-4"
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-14 left-0 right-0 bg-black border-b border-gray-800 md:hidden">
            <div className="p-4 space-y-6">
              <NavItems />
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-800">
                {session ? (
                  <div className="flex items-center gap-3">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={session?.user?.image || "/placeholder-avatar.png"}
                      alt={session?.user?.name || "User avatar"}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{session?.user?.name}</span>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-sm text-gray-400 hover:text-white text-left"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button 
                      variant="outline"
                      onClick={handleLogin}
                      className="w-full justify-center text-[15px] font-medium text-gray-200 hover:text-white bg-transparent border-gray-700"
                    >
                      Sign In
                    </Button>
                    <Button 
                      variant="default"
                      onClick={handleSignup}
                      className="w-full justify-center bg-white text-black hover:bg-gray-100 text-[15px] font-medium"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
