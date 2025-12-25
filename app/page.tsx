import { CacheSimulator } from "@/components/cache-simulator"
import { AlgorithmComparison } from "@/components/algorithm-comparison"
import { Cpu, Database, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Intelligent Cache Simulator</h1>
                <p className="text-xs text-muted-foreground">LRU · LFU · ARC Algorithm Comparison</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
              <Zap className="w-3 h-3" />
              Interactive Algorithm Visualization
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              Compare Cache Replacement Algorithms in Real-Time
            </h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Explore how LRU, LFU, and ARC caching strategies perform under different workloads with interactive
              visualizations and detailed metrics
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
            {[
              { icon: Cpu, title: "O(1) Operations", desc: "Optimized data structures" },
              { icon: Database, title: "Real-time Stats", desc: "Live hit/miss tracking" },
              { icon: Zap, title: "Multiple Workloads", desc: "Sequential, random, Zipfian" },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Interactive Simulator */}
          <CacheSimulator />

          {/* Algorithm Comparison */}
          <AlgorithmComparison />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            DSA Project · Cache Algorithm Analysis · Built with Next.js
          </p>
        </div>
      </footer>
    </div>
  )
}
