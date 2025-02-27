"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface BlogPost {
  id: number
  title: string
  content: string
  date: string
  author: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Introducing AI-Powered Code Analysis",
      content: "Learn about our new AI features that help you write better code faster.",
      date: "January 15, 2025",
      author: "Priyanshu Sah",
    },
    {
      id: 2,
      title: "Best Practices for Code Optimization",
      content: "Discover techniques to improve your code's performance and readability.",
      date: "January 10, 2025",
      author: "Priyanshu Sah",
    },
  ])

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  })

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const post: BlogPost = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: "Priyanshu Sah",
    }

    setPosts([post, ...posts])
    setNewPost({ title: "", content: "" })
    toast({
      title: "Success",
      description: "Blog post created successfully!",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Blog</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Write Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
                <DialogDescription>Share your thoughts with the community</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Input
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Write your post content..."
                    className="min-h-[200px]"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  />
                </div>
                <Button onClick={handleCreatePost} className="w-full">
                  Publish Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.date}</span>
                <span>By {post.author}</span>
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

