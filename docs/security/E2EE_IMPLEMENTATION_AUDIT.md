# E2EE Implementation Audit (code vs claims)

**Date:** 2026-09-09 · **Scope:** call media path + key directory (backend
`src/crypto/e2ee/*`, frontend `features/chat/lib/e2ee/*`,
`features/chat/model/useWebRTC.ts`, `docs/security/CRYPTOGRAPHIC_AUDIT_REPORT.md`

- ProVerif/Tamarin models) · **Method:** source review + test review, no
  dynamic testing, no side-channel lab.

## Verdict

**Do not claim end-to-end encryption for calls.** The deployed call path
derives media keys from server-known data (F1). Accurate label today:
_transport-obfuscated media on top of browser DTLS-SRTP_ — meaningful only
against passive outsiders who see neither signaling nor code.

The existing `CRYPTOGRAPHIC_AUDIT_REPORT.md` ("0 vulnerabilities") models a
_different protocol_ (hybrid X25519 + ML-KEM-768 + ML-DSA + HKDF + SAS
ceremony) than `useWebRTC.ts:463` executes. A proved model of protocol A
says nothing about deployed protocol B. Until the code matches the model
(or the report is rescoped), quote neither "post-quantum" nor "formally
verified" for calls — in UI, docs, or marketing.

## Findings

### F1 — Call media key is server-computable [CRITICAL]

`frontend/.../e2ee/frameCrypto.ts:112-125` (`deriveCallCryptoKey`):
`key = SHA-256("eternal-call-e2ee:" + callId + ":" + salt)`, salt defaulting
to the hardcoded public string `'eternal-e2ee-salt'`. Wired as the live path
in `useWebRTC.ts:463` + `:1229`. `callId` travels in plaintext signaling the
server creates and relays — the server (or anyone with signaling/logs) holds
everything needed to recompute the AES-GCM key and decrypt all media.
_Fix:_ ECDH via the existing key directory (`E2eeService` + non-extractable
WebCrypto helpers already in the file, currently unwired) with per-call
ephemerals; HKDF with both contributories; keep `deriveCallCryptoKey` only
behind an explicit `INSECURE_` name for local dev. Effort: 1–2 weeks.

### F2 — UI reports `verified` with zero verification [HIGH]

`useWebRTC.ts:468`: `setE2EEInfo('verified', …)` immediately after local
derivation — no SAS comparison, no key exchange. Users see a verified lock
for a key nobody verified. With F1 unfixed, SAS values match even under
server MITM.
_Fix:_ rename state to `unverified`, add a SAS-compare ceremony UI before any
`verified` label; gate the label on ECDH completion (F1). Effort: 3–5 days.

### F3 — Encryption fails OPEN [HIGH]

`frameCrypto.ts:186-188`: on `encrypt()` error the frame is sent
**unaltered (plaintext)** with a console warning; the receiver passes
untagged frames through (`:202-205`). One transient WebCrypto error silently
downgrades the call.
_Fix:_ fail closed — drop the frame, count `e2ee.encrypt_failures`. Effort: hours.

### F4 — IV reuse across sessions [HIGH]

IV = `SFRM_MAGIC || frameIndex`, counter restarting at 1 per transform
instance (`:164-168`, `:238`). Same key + repeated IV under AES-GCM destroys
confidentiality and integrity. Rekey or random session salt is missing.
_Fix:_ mix a per-session random into the IV (or re-key per call via F1) and
reject reused (key, IV) pairs. Effort: 1–2 days with F1, else band-aid only.

### F5 — Key directory accepts unparseable keys [MEDIUM]

`e2ee.service.ts:60-70`: fallback treats any 32–4096-byte base64 blob as a
"valid public key", contradicting the function's own docstring. Poisoned
directory entries break future sessions opaquely.
_Fix:_ enforce strict SPKI parse (drop the fallback) and store/return a
`SHA-256(SPKI)` fingerprint so clients can pin and display keys. Effort: 1 day.

### F6 — Unaudited PQC/MLS code ships in-tree [MEDIUM]

`pqcKeyExchange.ts` (hand-rolled ML-KEM-768) and `mlsTreeKem.ts` are imported
only by their own tests — dead in production. Hand-rolled PQC without KAT
vectors (NIST ACVP) must never be wired in on looks alone.
_Fix:_ keep quarantined; add KAT tests from FIPS 203 vectors before ANY
production use; delete if no owner in 1 quarter. Effort: 2–3 days for KATs.

### F7 — No forward secrecy design [MEDIUM, by design gap]

Static identity keys + no rotation/signed-prekey story: identity-key
compromise decrypts retained ciphertext. `initiateKeyExchange` (`:129-151`)
validates and returns success without persisting or relaying anything.
_Fix:_ per-conversation ephemerals (F1 covers 1:1), rotation policy, then
prekeys. Effort: 2–4 weeks after F1.

### F8 — Curve allowlist noise [LOW]

DTO permits `secp256k1` with no consumer need; default stays `prime256v1`.
_Fix:_ allow `x25519` (+ `prime256v1` legacy), drop the rest. Effort: hours.

## What is already right (keep)

- Key registration is auth-bound (`@CurrentUser`, `AuthGuard`) — no anonymous
  key overwrite; DTO validation + 4096-char cap + global `ThrottlerGuard`.
- `computeSharedSecret` / server keygen are test-only (no prod callers) — no
  live key escrow. Consider moving them to test helpers so the production
  service cannot derive secrets at all.
- Non-extractable WebCrypto helpers exist (`extractable: false`) — the right
  primitive, just unwired (see F1).
- Decrypt-side failures already drop frames (fail-closed); extend the same
  discipline to the sender (F3).

## Remediation order

1. F1 (ECDH wiring) + F2 (honest UI states) — unlocks every true E2EE claim.
2. F3 + F4 (fail-closed, IV hygiene) — same PR as F1, they touch the same lines.
3. F5 (directory strictness + fingerprints) — enables client key pinning.
4. Re-scope or re-prove: point ProVerif/Tamarin at the _implemented_
   handshake, or mark the current report "reference design, not deployed".
5. F6/F7/F8 as follow-ups; message-layer E2EE (ciphertext envelope in
   messenger) remains a separate project — today only the key directory
   exists server-side.

## Reviewer note on vectors

This repo's convention (golden vectors enforced on both sides, e.g.
`packages/*/vectors/`) should extend to any crypto that ships: KAT vectors
for KEM/cipher suites, SAS vectors, and handshake transcripts — so the next
audit diffs bytes, not prose.
