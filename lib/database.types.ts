export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string | null
          email: string | null
          emailVerified: string | null
          image: string | null
          password: string | null
          resetToken: string | null
          resetTokenExpiry: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name?: string | null
          email?: string | null
          emailVerified?: string | null
          image?: string | null
          password?: string | null
          resetToken?: string | null
          resetTokenExpiry?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          emailVerified?: string | null
          image?: string | null
          password?: string | null
          resetToken?: string | null
          resetTokenExpiry?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
      snippets: {
        Row: {
          id: string
          title: string
          code: string
          language: string
          userId: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          title: string
          code: string
          language: string
          userId: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          title?: string
          code?: string
          language?: string
          userId?: string
          createdAt?: string
          updatedAt?: string
        }
      }
    }
  }
}
