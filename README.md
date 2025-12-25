# Intelligent Cache Simulator

A comprehensive implementation and comparison of three advanced cache replacement algorithms: **LRU**, **LFU**, and **ARC**.

## 🎯 Project Overview

This project implements three cache replacement algorithms from scratch in pure C, demonstrating advanced data structures and algorithms concepts. It includes a sophisticated simulator for performance comparison across different workload patterns.

## 📋 Features

### Implemented Algorithms

1. **LRU (Least Recently Used)**
   - Hash Map + Doubly Linked List
   - O(1) time complexity for get/put
   - Simple recency-based eviction

2. **LFU (Least Frequently Used)**
   - Hash Map + Frequency Lists
   - O(1) time complexity for get/put
   - Tie-breaking using recency (LRU within same frequency)

3. **ARC (Adaptive Replacement Cache)**
   - Four lists: T1, T2, B1, B2
   - Adaptive parameter p
   - O(1) average time complexity
   - Self-tuning between recency and frequency

### Workload Patterns

- **Sequential**: Temporal locality simulation
- **Random**: No locality pattern
- **Zipfian**: Realistic access pattern (80-20 rule)
- **Loop**: Scanning workload
- **Mixed**: Combined hot/cold access pattern

## 🏗️ Architecture

```
cache_common.h    - Common interfaces and structures
lru.c/h          - LRU implementation
lfu.c/h          - LFU implementation
arc.c/h          - ARC implementation
simulator.c/h    - Workload generation and comparison
main.c           - Entry point and user interface
```

## 🚀 Building and Running

### Prerequisites
- GCC compiler
- Make
- Unix-like environment (Linux/macOS) or MinGW on Windows

### Build
```bash
make
```

### Run
```bash
make run
# or
./cache_simulator
```

### Clean
```bash
make clean
```

## 📊 Usage Modes

### 1. Quick Demo
Simple demonstration of LRU cache operations with manual trace.

### 2. Comprehensive Tests
Runs all three algorithms across all five workload patterns:
- Generates CSV results for each workload
- Displays detailed statistics
- Exports data for graphing

### 3. Interactive Mode
Custom configuration:
- Set cache capacity
- Choose number of accesses
- Select workload type
- Define key range

## 📈 Results

Results are exported in CSV format:
- `results_Sequential.csv`
- `results_Random.csv`
- `results_Zipfian.csv`
- `results_Loop.csv`
- `results_Mixed.csv`

Each file contains:
- Total accesses
- Cache hits/misses
- Evictions
- Hit ratio percentage

## 🔬 Performance Analysis

### Expected Behavior

**LRU Performance:**
- Best for: Sequential access, temporal locality
- Weakness: Doesn't consider frequency

**LFU Performance:**
- Best for: Repeated access patterns
- Weakness: Slow to adapt to working set changes

**ARC Performance:**
- Best for: Mixed workloads, unknown patterns
- Adapts between LRU and LFU behavior
- Generally best overall performance

## 🧪 Testing

### Memory Leak Detection
```bash
make valgrind
```

All implementations are memory-safe with proper malloc/free.

## 📚 Academic Value

This project demonstrates:
- Advanced data structure implementation (hash maps, doubly linked lists)
- Algorithm analysis and complexity
- Performance comparison methodology
- Real-world system design (CPU/database caching)
- Clean, documented, production-quality C code

## 🎓 Complexity Analysis

| Operation | LRU | LFU | ARC |
|-----------|-----|-----|-----|
| Get       | O(1)| O(1)| O(1)|
| Put       | O(1)| O(1)| O(1)*|

*ARC is O(1) average case due to adaptive parameter updates

## 📖 Report

A comprehensive academic report is included covering:
1. Introduction and motivation
2. Algorithm design and implementation
3. Data structures used
4. Complexity analysis
5. Performance results
6. Conclusions and future work

## 🤝 Contributing

This is an academic project. For educational purposes only.

## 📄 License

Educational use only - University Data Structures Project

## 👨‍💻 Author

Systems Programming & DSA Expert Implementation

---

**Note**: This implementation follows strict academic standards with no external libraries (STL-free, pure C implementation).
