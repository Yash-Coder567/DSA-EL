"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, TrendingUp } from "lucide-react"

interface CacheEntry {
  key: number
  frequency?: number
  timestamp?: number
  list?: string
}

interface CacheVisualizerProps {
  cacheState: CacheEntry[]
  algorithm: "lru" | "lfu" | "arc"
}

export function CacheVisualizer({ cacheState, algorithm }: CacheVisualizerProps) {
  if (!cacheState || cacheState.length === 0) {
    return (
      <Card className="p-12 text-center border-dashed">
        <p className="text-muted-foreground text-sm">Run a simulation to see cache state</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold">Current Cache Contents</h3>
        <Badge variant="outline" className="text-xs">
          {cacheState.length} entries
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {cacheState.map((entry, index) => (
          <Card key={index} className="p-3 border-border hover:border-primary/50 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Key</span>
                <span className="text-lg font-bold text-foreground">{entry.key}</span>
              </div>

              {algorithm === "lfu" && entry.frequency !== undefined && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  <span>Freq: {entry.frequency}</span>
                </div>
              )}

              {algorithm === "lru" && entry.timestamp !== undefined && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>T: {entry.timestamp}</span>
                </div>
              )}

              {algorithm === "arc" && entry.list && (
                <Badge
                  variant={entry.list === "T1" || entry.list === "T2" ? "default" : "secondary"}
                  className="text-xs w-full justify-center"
                >
                  {entry.list}
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
