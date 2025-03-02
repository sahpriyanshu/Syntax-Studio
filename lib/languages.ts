export type LanguageId = 
  | "c"
  | "cpp"
  | "csharp"
  | "go"
  | "java"
  | "javascript"
  | "python"
  | "ruby"
  | "php"
  | "swift"
  | "rust"

export interface Language {
  id: LanguageId
  name: string
  version: string
}

export const languages: Language[] = [
  { id: "c", name: "C", version: "GCC 9.3.0" },
  { id: "cpp", name: "C++", version: "G++ 9.3.0" },
  { id: "csharp", name: "C#", version: "Mono 6.12.0" },
  { id: "go", name: "Go", version: "1.15.6" },
  { id: "java", name: "Java", version: "OpenJDK 11.0.9" },
  { id: "javascript", name: "JavaScript", version: "Node.js 14.16.0" },
  { id: "python", name: "Python", version: "3.8.6" },
  { id: "ruby", name: "Ruby", version: "2.7.1" },
  { id: "php", name: "PHP", version: "7.4.3" },
  { id: "swift", name: "Swift", version: "5.3.1" },
  { id: "rust", name: "Rust", version: "1.48.0" }
]
