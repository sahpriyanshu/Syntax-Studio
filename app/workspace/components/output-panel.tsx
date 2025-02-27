import { motion } from "framer-motion"

interface OutputPanelProps {
  output: string
}

export function OutputPanel({ output }: OutputPanelProps) {
  const lines = output.split("\n")

  return (
    <div className="h-full w-full overflow-auto rounded-md bg-black p-4 font-mono text-xs md:text-sm text-white">
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {line}
        </motion.div>
      ))}
      {output === "" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-400"
        >
          Run your code or get AI suggestions to see output here
        </motion.div>
      )}
    </div>
  )
}

