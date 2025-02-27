# Authentication Setup Guide for Syntax Studio

This guide will help you set up authentication in your Syntax Studio project using NextAuth.js.

## Prerequisites

1. Node.js 14.x or later
2. A Google Developer account (for Google OAuth)
3. A GitHub account (for GitHub OAuth)

## Step 1: Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```env
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

