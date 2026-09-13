/**
 * Isomorphic, zero-dependency HTML tag stripper for shared contracts and DTO schemas.
 * Safely strips HTML markup, script/style blocks, and entities without pulling in
 * Node.js-specific modules (fs, path, url, source-map-js) into client bundles.
 */
export function sanitizePlainText(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  return value
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export const sanitizeHtml = sanitizePlainText;
