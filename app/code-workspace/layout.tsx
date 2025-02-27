export default function CodeWorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B4371] to-[#F3904F]">
      {children}
    </div>
  )
}
