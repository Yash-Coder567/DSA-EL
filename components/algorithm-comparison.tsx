"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, Database, Zap } from "lucide-react"

export function AlgorithmComparison() {
  const algorithms = [
    {
      name: "LRU",
      full: "Least Recently Used",
      complexity: "O(1)",
      description:
        "Evicts the least recently accessed item. Uses a doubly linked list with hash map for O(1) operations.",
      pros: ["Simple to implement", "O(1) time complexity", "Good for temporal locality"],
      cons: ["Vulnerable to sequential scans", "No frequency awareness"],
      structure: "Hash Map + Doubly Linked List",
      useCase: "Web browsers, OS page caching",
    },
    {
      name: "LFU",
      full: "Least Frequently Used",
      complexity: "O(1)",
      description:
        "Evicts items with lowest access frequency. Uses min-frequency tracking with tie-breaking by recency.",
      pros: ["Frequency-aware", "Resists cache pollution", "O(1) with proper structure"],
      cons: ["Complex implementation", "Cold start problem", "Memory overhead"],
      structure: "Frequency Lists + Hash Maps",
      useCase: "CDN caching, database query caching",
    },
    {
      name: "ARC",
      full: "Adaptive Replacement Cache",
      complexity: "O(1)",
      description:
        "Self-tuning algorithm with four lists (T1, T2, B1, B2) and adaptive parameter p for balancing recency and frequency.",
      pros: ["Self-adaptive", "Best of LRU and LFU", "Scan-resistant"],
      cons: ["Most complex", "Higher memory overhead", "Patent restrictions"],
      structure: "4 Doubly Linked Lists + 2 Hash Maps",
      useCase: "Storage systems, ZFS, database buffers",
    },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-2xl">Algorithm Comparison</CardTitle>
        <CardDescription>Understanding cache replacement strategies</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lru" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {algorithms.map((algo) => (
              <TabsTrigger key={algo.name} value={algo.name.toLowerCase()}>
                {algo.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {algorithms.map((algo) => (
            <TabsContent key={algo.name} value={algo.name.toLowerCase()} className="mt-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{algo.full}</h3>
                    <Badge variant="outline" className="gap-1">
                      <Zap className="w-3 h-3" />
                      {algo.complexity}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{algo.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-green-500/5 border-green-500/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-4 h-4" />
                        Advantages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {algo.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-500/5 border-orange-500/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2 text-orange-600 dark:text-orange-400">
                        <Clock className="w-4 h-4" />
                        Limitations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {algo.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-orange-600 dark:text-orange-400 mt-0.5">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold text-sm">Data Structure</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{algo.structure}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold text-sm">Real-World Use</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{algo.useCase}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
