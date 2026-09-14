/**
 * Isomorphic, zero-dependency HTML tag stripper for shared contracts and DTO schemas.
 * Safely strips HTML markup, script/style blocks, and entities without pulling in
 * Node.js-specific modules (fs, path, url, source-map-js) into client bundles.
 */
const ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
};

export function sanitizePlainText(value: unknown): unknown {
  if (typeof value !== 'string') return value;

  let sanitized = value;
  let prev = '';
  // Repeat removal until no more nested tags, script blocks or comments remain
  while (sanitized !== prev) {
    prev = sanitized;
    sanitized = sanitized
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<script\b[\s\S]*?<\/script\s*>/gi, '')
      .replace(/<style\b[\s\S]*?<\/style\s*>/gi, '')
      .replace(/<[^>]+>/g, '');
  }

  // Single-pass atomic entity decoding to prevent double unescaping
  return sanitized
    .replace(
      /&(?:amp|lt|gt|quot|#39|apos|nbsp);/gi,
      (match) => ENTITY_MAP[match.toLowerCase()] || match,
    )
    .trim();
}

export const sanitizeHtml = sanitizePlainText;
