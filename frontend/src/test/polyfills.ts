// Polyfill Web Streams API (TransformStream, ReadableStream, WritableStream)
// for jsdom environment. @mswjs/interceptors@0.41.x requires these globals at
// module-load time but jsdom does not expose them on globalThis.
// This file must be listed FIRST in vite.config.ts `test.setupFiles`.
import { TransformStream, ReadableStream, WritableStream } from 'node:stream/web';

if (typeof globalThis.TransformStream === 'undefined') {
  globalThis.TransformStream = TransformStream as typeof globalThis.TransformStream;
}
if (typeof globalThis.ReadableStream === 'undefined') {
  globalThis.ReadableStream = ReadableStream as typeof globalThis.ReadableStream;
}
if (typeof globalThis.WritableStream === 'undefined') {
  globalThis.WritableStream = WritableStream as typeof globalThis.WritableStream;
}
