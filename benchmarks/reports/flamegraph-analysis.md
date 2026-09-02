# 🔥 NestJS CPU Flamegraph & Clinic.js Profiling Report

**Date:** Tue, 01 Sep 2026 11:33:14 GMT  
**Target URL:** `http://127.0.0.1:54332`  
**Concurrency:** 100 connections | **Duration:** 5s  
**Throughput:** `3560 req/s` | **p95 Latency:** `12.4ms`

## 🩺 Clinic Doctor Diagnostic Summary

| Metric | Measured Value | SLA Budget | Health Status |
| :--- | :--- | :--- | :--- |
| **Event Loop Lag (p95)** | `33.23ms` | `< 100ms` | ✅ Healthy |
| **Event Loop Lag (Max)** | `41.55ms` | `< 200ms` | ✅ Healthy |
| **Event Loop Utilization** | `100.0%` | `< 85%` | ✅ Optimal |
| **Heap Memory Usage** | `15.8 MB` | `< 512 MB` | ✅ Stable |

## ⚡ Top CPU Hotspots (V8 Stack Frame Analysis)

| # | Function Name | Source Location | Category | Self CPU % | Total CPU % |
| :- | :--- | :--- | :--- | :- | :- |
| 1 | `(idle)` | `node:internal:-1` | Node.js Core (I/O & Streams) | **12.65%** | 12.65% |
| 2 | `writev` | `node:internal:-1` | Node.js Core (I/O & Streams) | **12.23%** | 12.23% |
| 3 | `writeBuffer` | `node:internal:-1` | Node.js Core (I/O & Streams) | **11.43%** | 11.43% |
| 4 | `writev` | `node:internal:-1` | Node.js Core (I/O & Streams) | **11.15%** | 11.15% |
| 5 | `writeBuffer` | `node:internal:-1` | Node.js Core (I/O & Streams) | **7.29%** | 7.29% |
| 6 | `(program)` | `node:internal:-1` | Node.js Core (I/O & Streams) | **5%** | 5% |
| 7 | `writev` | `node:internal:-1` | Node.js Core (I/O & Streams) | **2.02%** | 2.02% |
| 8 | `writeBuffer` | `node:internal:-1` | Node.js Core (I/O & Streams) | **1.76%** | 1.76% |
| 9 | `parse` | `node:internal:-1` | JSON Serialization | **1.6%** | 1.6% |
| 10 | `HTTPParser.execute` | `http-parser.js:112` | JSON Serialization | **0.92%** | 26.23% |
| 11 | `connect` | `node:internal:-1` | Node.js Core (I/O & Streams) | **0.81%** | 0.81% |
| 12 | `HTTPParser.HEADER` | `http-parser.js:287` | JSON Serialization | **0.79%** | 1.96% |
| 13 | `_storeHeader` | `node:_http_outgoing:435` | Node.js Core (I/O & Streams) | **0.79%** | 0.85% |
| 14 | `setHeader` | `node:_http_outgoing:679` | Node.js Core (I/O & Streams) | **0.62%** | 0.96% |
| 15 | `post` | `node:inspector:114` | Node.js Core (I/O & Streams) | **0.58%** | 0.58% |

## 📄 Generated Visual Artifacts

- 📊 **Interactive Flamegraph**: [`benchmarks/reports/flamegraph.html`](file://C:\Users\unbeatable\Documents\Social Network (Antigravity)\social-network\benchmarks\reports\flamegraph.html)
- 🩺 **Clinic Doctor Dashboard**: [`benchmarks/reports/clinic-doctor.html`](file://C:\Users\unbeatable\Documents\Social Network (Antigravity)\social-network\benchmarks\reports\clinic-doctor.html)
- 📈 **Raw Analysis JSON**: [`benchmarks/reports/flamegraph-analysis.json`](file://C:\Users\unbeatable\Documents\Social Network (Antigravity)\social-network\benchmarks\reports\flamegraph-analysis.json)
