# 🚀 Automated Performance Benchmark Report

**Date:** Tue, 01 Sep 2026 11:33:08 GMT  
**Target URL:** `http://127.0.0.1:3000`  
**Concurrency:** 100 connections | **Duration:** 5s per test

## Summary Table

| Scenario | RPS (Req/s) | p95 Latency | SLA Budget | Event Loop Lag (Max) | Event Loop Util | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Health Check Baseline Liveness** | `2851` | `14.2ms` | `30ms` | `0ms` | `100.0%` | ✅ **PASSED** |
| **Main Feed Query (Paginated)** | `2851` | `14.2ms` | `150ms` | `0ms` | `100.0%` | ✅ **PASSED** |
| **Explore Media Posts Feed** | `2851` | `14.2ms` | `150ms` | `0ms` | `100.0%` | ✅ **PASSED** |
| **Post Full-Text Search Query** | `2851` | `14.2ms` | `150ms` | `0ms` | `100.0%` | ✅ **PASSED** |

## SLA Threshold Targets

- **Max Event Loop Lag**: `< 100ms`
- **Feed p95 Latency**: `< 150ms`
- **Health p95 Latency**: `< 30ms`
- **Max Allowed Error Rate**: `< 1.0%`

