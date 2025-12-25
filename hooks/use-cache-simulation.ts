"use client"

import { useState, useCallback } from "react"

interface CacheEntry {
  key: number
  frequency?: number
  timestamp?: number
  list?: string
}

interface Statistics {
  hits: number
  misses: number
  hitRate: number
  evictions: number
}

export function useCacheSimulation() {
  const [cacheState, setCacheState] = useState<CacheEntry[]>([])
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [history, setHistory] = useState<Array<{ access: number; hitRate: number }>>([])
  const [isRunning, setIsRunning] = useState(false)

  const generateWorkload = useCallback((type: string, count: number): number[] => {
    const workload: number[] = []

    switch (type) {
      case "sequential":
        for (let i = 0; i < count; i++) {
          workload.push(i % 10)
        }
        break

      case "random":
        for (let i = 0; i < count; i++) {
          workload.push(Math.floor(Math.random() * 20))
        }
        break

      case "zipfian":
        // Zipfian distribution - some keys are accessed much more frequently
        for (let i = 0; i < count; i++) {
          const rand = Math.random()
          if (rand < 0.5)
            workload.push(0) // 50% access to key 0
          else if (rand < 0.75)
            workload.push(1) // 25% access to key 1
          else if (rand < 0.875)
            workload.push(2) // 12.5% access to key 2
          else workload.push(Math.floor(Math.random() * 10) + 3)
        }
        break

      case "loop":
        const pattern = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
        for (let i = 0; i < count; i++) {
          workload.push(pattern[i % pattern.length])
        }
        break
    }

    return workload
  }, [])

  const simulateLRU = useCallback((workload: number[], capacity: number) => {
    const cache = new Map<number, { key: number; timestamp: number }>()
    let hits = 0
    let misses = 0
    let evictions = 0
    let timestamp = 0
    const historyData: Array<{ access: number; hitRate: number }> = []

    workload.forEach((key, index) => {
      timestamp++

      if (cache.has(key)) {
        hits++
        cache.set(key, { key, timestamp })
      } else {
        misses++

        if (cache.size >= capacity) {
          // Find LRU item
          let lruKey = -1
          let minTimestamp = Number.POSITIVE_INFINITY
          cache.forEach((value, k) => {
            if (value.timestamp < minTimestamp) {
              minTimestamp = value.timestamp
              lruKey = k
            }
          })
          cache.delete(lruKey)
          evictions++
        }

        cache.set(key, { key, timestamp })
      }

      // Record history every 5 accesses
      if ((index + 1) % 5 === 0) {
        const totalAccesses = hits + misses
        historyData.push({
          access: index + 1,
          hitRate: (hits / totalAccesses) * 100,
        })
      }
    })

    const cacheArray: CacheEntry[] = Array.from(cache.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((v) => ({ key: v.key, timestamp: v.timestamp }))

    return { cacheArray, hits, misses, evictions, historyData }
  }, [])

  const simulateLFU = useCallback((workload: number[], capacity: number) => {
    const cache = new Map<number, { key: number; frequency: number; timestamp: number }>()
    let hits = 0
    let misses = 0
    let evictions = 0
    let timestamp = 0
    const historyData: Array<{ access: number; hitRate: number }> = []

    workload.forEach((key, index) => {
      timestamp++

      if (cache.has(key)) {
        hits++
        const entry = cache.get(key)!
        cache.set(key, { key, frequency: entry.frequency + 1, timestamp })
      } else {
        misses++

        if (cache.size >= capacity) {
          // Find LFU item (with LRU tie-breaking)
          let lfuKey = -1
          let minFreq = Number.POSITIVE_INFINITY
          let minTimestamp = Number.POSITIVE_INFINITY
          cache.forEach((value, k) => {
            if (value.frequency < minFreq || (value.frequency === minFreq && value.timestamp < minTimestamp)) {
              minFreq = value.frequency
              minTimestamp = value.timestamp
              lfuKey = k
            }
          })
          cache.delete(lfuKey)
          evictions++
        }

        cache.set(key, { key, frequency: 1, timestamp })
      }

      // Record history every 5 accesses
      if ((index + 1) % 5 === 0) {
        const totalAccesses = hits + misses
        historyData.push({
          access: index + 1,
          hitRate: (hits / totalAccesses) * 100,
        })
      }
    })

    const cacheArray: CacheEntry[] = Array.from(cache.values())
      .sort((a, b) => b.frequency - a.frequency)
      .map((v) => ({ key: v.key, frequency: v.frequency }))

    return { cacheArray, hits, misses, evictions, historyData }
  }, [])

  const simulateARC = useCallback((workload: number[], capacity: number) => {
    // Simplified ARC simulation
    const t1 = new Map<number, { key: number; list: string }>() // Recent items (once)
    const t2 = new Map<number, { key: number; list: string }>() // Frequent items (twice+)
    let hits = 0
    let misses = 0
    let evictions = 0
    const historyData: Array<{ access: number; hitRate: number }> = []

    workload.forEach((key, index) => {
      if (t1.has(key)) {
        hits++
        t1.delete(key)
        t2.set(key, { key, list: "T2" })
      } else if (t2.has(key)) {
        hits++
        // Already in T2, no change
      } else {
        misses++

        const totalSize = t1.size + t2.size
        if (totalSize >= capacity) {
          // Evict from T1 first (LRU behavior)
          if (t1.size > 0) {
            const firstKey = t1.keys().next().value
            t1.delete(firstKey)
          } else {
            const firstKey = t2.keys().next().value
            t2.delete(firstKey)
          }
          evictions++
        }

        t1.set(key, { key, list: "T1" })
      }

      // Record history every 5 accesses
      if ((index + 1) % 5 === 0) {
        const totalAccesses = hits + misses
        historyData.push({
          access: index + 1,
          hitRate: (hits / totalAccesses) * 100,
        })
      }
    })

    const cacheArray: CacheEntry[] = [...Array.from(t1.values()), ...Array.from(t2.values())]

    return { cacheArray, hits, misses, evictions, historyData }
  }, [])

  const runSimulation = useCallback(
    async (algorithm: "lru" | "lfu" | "arc", capacity: number, workloadType: string, accessCount: number) => {
      setIsRunning(true)

      // Simulate delay for visual effect
      await new Promise((resolve) => setTimeout(resolve, 500))

      const workload = generateWorkload(workloadType, accessCount)

      let result
      switch (algorithm) {
        case "lru":
          result = simulateLRU(workload, capacity)
          break
        case "lfu":
          result = simulateLFU(workload, capacity)
          break
        case "arc":
          result = simulateARC(workload, capacity)
          break
      }

      const { cacheArray, hits, misses, evictions, historyData } = result
      const totalAccesses = hits + misses
      const hitRate = (hits / totalAccesses) * 100

      setCacheState(cacheArray)
      setStatistics({ hits, misses, hitRate, evictions })
      setHistory(historyData)
      setIsRunning(false)
    },
    [generateWorkload, simulateLRU, simulateLFU, simulateARC],
  )

  const reset = useCallback(() => {
    setCacheState([])
    setStatistics(null)
    setHistory([])
  }, [])

  return {
    cacheState,
    statistics,
    history,
    isRunning,
    runSimulation,
    reset,
  }
}
