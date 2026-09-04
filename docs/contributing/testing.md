# 🧪 Testing & Verification Guide

Our testing philosophy emphasizes high-confidence integration and end-to-end verification over brittle unit tests.

---

## 🎯 Testing Strategy Overview

| Tier                     | Target                                  | Tooling                              | Execution Scope           |
| :----------------------- | :-------------------------------------- | :----------------------------------- | :------------------------ |
| **Backend E2E**          | API endpoints, DB, Auth & Middleware    | Jest + Supertest                     | `backend/test/`           |
| **Frontend Integration** | React components, FSD slices, Hooks     | Vitest + React Testing Library + MSW | `frontend/src/`           |
| **Mutation Testing**     | Code resiliency & test suite robustness | Stryker Mutator                      | Backend & Frontend        |
| **Performance / Load**   | Throughput, latency, memory bottlenecks | k6, Autocannon, Clinic.js            | `benchmarks/`, `scripts/` |
| **Web Vitals & SEO**     | LCP, FID, CLS, Accessibility            | Lighthouse CI (`lhci`)               | Frontend bundle           |

> [!IMPORTANT]
> **Backend Unit Tests Rule**:
> In accordance with our architecture rules, backend unit tests (`*.spec.ts`) in `backend/src/` are omitted in favor of comprehensive End-to-End tests in `backend/test/`. Do not create unit tests that mock repositories or services; test full HTTP request-response lifecycles against the test database.

---

## 🚀 Running Tests

### Standard Test Commands

```bash
# Run all workspace tests (backend E2E + frontend Vitest)
pnpm test

# Run backend E2E test suite exclusively
pnpm test:e2e

# Run frontend tests
pnpm test:frontend

# Run frontend tests with interactive UI
pnpm --filter frontend test:ui

# Run frontend tests in watch mode
pnpm --filter frontend test:watch

# Generate coverage reports
pnpm test:cov
```

---

## 🟦 Backend End-to-End Testing (Jest + Supertest)

Backend tests live in `backend/test/` and run against an isolated PostgreSQL instance or transaction rollback harness:

```typescript
// backend/test/posts.e2e-spec.ts
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './test-utils';

describe('Posts API (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    app = await createTestingApp();
    authToken = await getAuthToken(app, 'alice@example.com', 'SecurePass123!');
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /api/posts - creates post with valid contract payload', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ content: 'Hello Open Source World!' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.content).toBe('Hello Open Source World!');
    expect(res.body.likesCount).toBe(0);
  });

  it('POST /api/posts - rejects invalid payload with 400 and structured issues', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ content: '' }) // Empty content violates Zod contract
      .expect(400);

    expect(res.body.error).toBe('Bad Request');
    expect(res.body.issues[0].field).toBe('content');
  });
});
```

---

## 🟩 Frontend Component & Hook Testing (Vitest + MSW)

Frontend tests use **Vitest** for fast native ESM execution and **Mock Service Worker (MSW)** to intercept network calls:

```typescript
// frontend/src/features/posts/ui/__tests__/CreatePostForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CreatePostForm } from '../CreatePostForm';
import { TestWrapper } from '@/shared/test/TestWrapper';

describe('CreatePostForm', () => {
  it('validates empty inputs and submits successfully', async () => {
    render(
      <TestWrapper>
        <CreatePostForm onCreated={vi.fn()} />
      </TestWrapper>,
    );

    const submitBtn = screen.getByRole('button', { name: /publish/i });
    fireEvent.click(submitBtn);

    // Zod error renders inline
    expect(await screen.findByText(/content cannot be empty/i)).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText(/what's on your mind/i);
    fireEvent.change(textarea, { target: { value: 'Excited for the new release!' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.queryByText(/content cannot be empty/i)).not.toBeInTheDocument();
    });
  });
});
```

---

## 🧬 Mutation Testing (Stryker)

Mutation testing introduces deliberate faults (mutants) into the source code to verify that our tests actually catch regressions:

```bash
# Run mutation tests for the entire monorepo
pnpm test:mutation
```

Aim for a mutation score `>= 70%` on critical security and domain modules.

---

## 📊 Benchmarks & Stress Testing

Evaluate system limits under high concurrency using our benchmark harness:

```bash
# 1. Run automated k6 load test scenarios
pnpm benchmark:k6

# 2. Run high-throughput HTTP benchmarks with Autocannon
pnpm benchmark:autocannon

# 3. Profile CPU bottlenecks and flamegraphs with Clinic.js
pnpm benchmark:flame

# 4. Profile Node.js event-loop delays & memory leaks
pnpm benchmark:doctor
```

---

## 🚦 Lighthouse CI Performance Audits

Before merging UI PRs, run Lighthouse CI to prevent bundle regressions:

```bash
pnpm lhci
```

Thresholds:

- Performance: `>= 90`
- Accessibility: `>= 95`
- Best Practices: `>= 95`
- SEO: `>= 95`
