interface OutputDetailsProps {
  outputDetails: {
    status?: {
      id?: number
      description?: string
    }
    memory?: string | number
    time?: string | number
  }
}

const OutputDetails = ({ outputDetails }: OutputDetailsProps) => {
  return (
    <div className="mt-4 space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-secondary/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <p className="font-mono font-medium">{outputDetails?.status?.description || "N/A"}</p>
        </div>
        <div className="p-3 bg-secondary/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Memory</p>
          <p className="font-mono font-medium">{outputDetails?.memory ? `${outputDetails.memory} KB` : "N/A"}</p>
        </div>
        <div className="p-3 bg-secondary/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Time</p>
          <p className="font-mono font-medium">{outputDetails?.time ? `${outputDetails.time} s` : "N/A"}</p>
        </div>
      </div>
    </div>
  )
}

export default OutputDetails

