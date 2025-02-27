interface ConsoleProps {
  output: string[]
  onClear: () => void
}

export function Console({ output, onClear }: ConsoleProps) {
  return (
    <div className="h-full bg-[#1e1e1e] text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-mono">Console Output</h3>
        <button onClick={onClear} className="text-xs text-white/60 hover:text-white">
          Clear
        </button>
      </div>
      <div className="space-y-2 font-mono text-sm">
        {output.map((message, index) => (
          <div key={index} className="text-white/90">
            {message}
          </div>
        ))}
        {output.length === 0 && <div className="text-white/60">No console output</div>}
      </div>
    </div>
  )
}

