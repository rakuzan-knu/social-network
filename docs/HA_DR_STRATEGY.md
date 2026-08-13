# 🌐 High Availability (HA) & Disaster Recovery (DR) Strategy

This document outlines the architecture migration path from single-region/single-AZ deployments to enterprise Multi-Region HA/DR.

---

## 🛑 Current Single-AZ Risk Profile

Currently deployed on **Render (Backend)** + **Vercel (Frontend)**:

- **Single Point of Failure (SPOF)**: Single cloud availability zone (Frankfurt region).
- **Service Interruption Risk**: Render free instances sleep after 15 minutes of inactivity (mitigated via UptimeRobot keep-alive).
- **RTO Target**: 2 Hours (Manual failover).
- **RPO Target**: 24 Hours (Daily backup dumps).

---

## 🚀 Multi-Region HA & DR Target Architecture

```
                       +-------------------------------+
                       |   Cloudflare Global Anycast   |
                       | DNS + WAF + Geo-Load Balancing|
                       +---------------+---------------+
                                       |
                   +-------------------+-------------------+
                   |                                       |
                   v                                       v
      +------------------------+              +------------------------+
      |  Primary Region (US)   |              | Secondary Region (EU)  |
      |  AWS ECS / Render Pro  |              | AWS ECS / Render Pro   |
      +-----------+------------+              +-----------+------------+
                  |                                       |
                  +-------------------+-------------------+
                                      |
                         +------------v------------+
                         |  Multi-AZ Managed DB    |
                         |  AWS RDS PostgreSQL     |
                         |  Primary + Read Replica |
                         +-------------------------+
```

---

## 📋 Implementation Milestones

### Phase 1: High Availability (Same Region Multi-AZ)

1. **Container Scaling**: Upgrade backend deployment from 1 replica to 2+ active replicas (`docker-compose.prod.yml` updated with `replicas: 2`).
2. **Managed Multi-AZ Database**: Migrate PostgreSQL to AWS RDS Multi-AZ or Supabase/Neon Pro with standby failover instance.
3. **Managed Redis Cluster**: Transition single-instance Redis to AWS ElastiCache for Redis (Multi-AZ with Auto-Failover).

### Phase 2: Multi-Region Disaster Recovery

1. **Global Traffic Management**: Route user traffic through Cloudflare Anycast with active health probes and automatic failover.
2. **Cross-Region Read Replicas**: Deploy read-replicas in secondary region for zero-downtime read queries and fast failover.
3. **RTO/RPO Targets**:
   - **Recovery Time Objective (RTO)**: < 5 minutes (Automated DNS Failover).
   - **Recovery Point Objective (RPO)**: < 1 minute (Asynchronous DB Replication).
