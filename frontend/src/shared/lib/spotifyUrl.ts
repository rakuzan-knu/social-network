/**
 * HTML entity decoder to guarantee clean string presentation and comparison
 */
export function unescapeHtml(str?: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Extracts a genuine 22-character Spotify track ID from any track representation,
 * URL, or URI, while ignoring synthetic or placeholder IDs.
 */
export function extractSpotifyTrackId(
  track?: {
    id?: string | null;
    trackId?: string | null;
    spotifyUrl?: string | null;
  } | null,
): string | null {
  if (!track) return null;

  // 1. Direct ID or trackId if it is a valid 22-char base62 string
  for (const rawId of [track.trackId, track.id]) {
    if (!rawId) continue;
    const clean = rawId.replace(/^spotify:track:/, '').trim();
    if (/^[a-zA-Z0-9]{22}$/.test(clean)) {
      return clean;
    }
  }

  // 2. Extract from spotifyUrl or URI (e.g. https://open.spotify.com/track/48TKaLj9x4L329teHsLngL)
  const candidateUrls = [track.spotifyUrl, track.id, track.trackId].filter(Boolean) as string[];
  for (const url of candidateUrls) {
    const match = url.match(/(?:track\/|track:)([a-zA-Z0-9]{22})/);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Ensures that a track URL is strictly a genuine Spotify link.
 * Strips out any Apple Music / iTunes or invalid URLs and guarantees a
 * direct track link or Spotify search query link.
 */
export function getSafeSpotifyTrackUrl(
  track?: {
    spotifyUrl?: string | null;
    id?: string | null;
    trackId?: string | null;
    title?: string;
    artist?: string;
  } | null,
): string {
  if (!track) return 'https://open.spotify.com';

  const rawUrl = track.spotifyUrl?.trim();
  if (rawUrl && rawUrl.includes('spotify.com')) {
    return rawUrl;
  }

  // If there's an authentic Spotify track ID
  const safeId = extractSpotifyTrackId(track);
  if (safeId) {
    return `https://open.spotify.com/track/${safeId}`;
  }

  // Fallback to Spotify web search query
  const query = [unescapeHtml(track.title), unescapeHtml(track.artist)]
    .filter(Boolean)
    .join(' ')
    .trim();
  if (query) {
    return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
  }

  return 'https://open.spotify.com';
}
