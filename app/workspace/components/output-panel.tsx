import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

interface OutputPanelProps {
  output: string
}

export function OutputPanel({ output }: OutputPanelProps) {
  const lines = output.split("\n")
  const isError = output.includes("Error:") || output.includes("Runtime Error")
  const isAnalyzing = output === "Analyzing code..."
  const isGenerating = output === "Generating code..."
  const isCompiling = output === "Compiling..."
  const isProcessing = isAnalyzing || isGenerating || isCompiling

  return (
    <div className="h-full w-full overflow-auto rounded-md bg-zinc-900 p-4 font-mono text-xs md:text-sm">
      {lines.map((line, index) => {
        const isErrorLine = line.includes("Error:") || line.includes("Runtime Error")
        const isCompileOutput = line.includes("Compilation Error:")
        const isAISuggestion = line.match(/^\d+\.\s/) && output.includes("AI Code Analysis Suggestions:")
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={cn(
              "font-mono whitespace-pre-wrap break-words",
              isErrorLine && "text-red-400 font-semibold",
              isCompileOutput && "text-yellow-400 font-semibold",
              isAISuggestion && "text-purple-400",
              !isErrorLine && !isCompileOutput && !isAISuggestion && "text-green-400"
            )}
          >
            {line}
          </motion.div>
        )
      })}
      {output === "" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-400 italic"
        >
          Run your code to see the output here...
        </motion.div>
      )}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "flex items-center gap-2",
            isCompiling && "text-green-400",
            isAnalyzing && "text-purple-400",
            isGenerating && "text-blue-400"
          )}
        >
          <Spinner />
          {output}
        </motion.div>
      )}
    </div>
  )
}
