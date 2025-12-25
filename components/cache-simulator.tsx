"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, RotateCcw, Settings } from "lucide-react"
import { CacheVisualizer } from "./cache-visualizer"
import { PerformanceChart } from "./performance-chart"
import { useCacheSimulation } from "@/hooks/use-cache-simulation"

export function CacheSimulator() {
  const [cacheSize, setCacheSize] = useState(4)
  const [workloadType, setWorkloadType] = useState<"sequential" | "random" | "zipfian" | "loop">("sequential")
  const [accessCount, setAccessCount] = useState(20)
  const [algorithm, setAlgorithm] = useState<"lru" | "lfu" | "arc">("lru")

  const { cacheState, statistics, history, isRunning, runSimulation, reset } = useCacheSimulation()

  const handleRun = () => {
    runSimulation(algorithm, cacheSize, workloadType, accessCount)
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Cache Simulator</CardTitle>
            <CardDescription>Configure and run cache simulations</CardDescription>
          </div>
          <Settings className="w-5 h-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/50 border border-border">
          <div className="space-y-2">
            <Label htmlFor="algorithm" className="text-xs font-medium">
              Algorithm
            </Label>
            <Select value={algorithm} onValueChange={(v: any) => setAlgorithm(v)}>
              <SelectTrigger id="algorithm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lru">LRU</SelectItem>
                <SelectItem value="lfu">LFU</SelectItem>
                <SelectItem value="arc">ARC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cacheSize" className="text-xs font-medium">
              Cache Size
            </Label>
            <Input
              id="cacheSize"
              type="number"
              min={2}
              max={16}
              value={cacheSize}
              onChange={(e) => setCacheSize(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workload" className="text-xs font-medium">
              Workload Type
            </Label>
            <Select value={workloadType} onValueChange={(v: any) => setWorkloadType(v)}>
              <SelectTrigger id="workload">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sequential">Sequential</SelectItem>
                <SelectItem value="random">Random</SelectItem>
                <SelectItem value="zipfian">Zipfian</SelectItem>
                <SelectItem value="loop">Loop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessCount" className="text-xs font-medium">
              Access Count
            </Label>
            <Input
              id="accessCount"
              type="number"
              min={10}
              max={100}
              value={accessCount}
              onChange={(e) => setAccessCount(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleRun} disabled={isRunning} className="gap-2">
            <Play className="w-4 h-4" />
            {isRunning ? "Running..." : "Run Simulation"}
          </Button>
          <Button onClick={reset} variant="outline" className="gap-2 bg-transparent">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Statistics */}
        {statistics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Hits", value: statistics.hits, color: "text-green-600 dark:text-green-400" },
              { label: "Misses", value: statistics.misses, color: "text-red-600 dark:text-red-400" },
              {
                label: "Hit Rate",
                value: `${statistics.hitRate.toFixed(1)}%`,
                color: "text-blue-600 dark:text-blue-400",
              },
              { label: "Evictions", value: statistics.evictions, color: "text-orange-600 dark:text-orange-400" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border">
                <div className="text-xs font-medium text-muted-foreground">{stat.label}</div>
                <div className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Visualization Tabs */}
        <Tabs defaultValue="cache" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cache">Cache State</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="cache" className="mt-4">
            <CacheVisualizer cacheState={cacheState} algorithm={algorithm} />
          </TabsContent>
          <TabsContent value="performance" className="mt-4">
            <PerformanceChart history={history} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
