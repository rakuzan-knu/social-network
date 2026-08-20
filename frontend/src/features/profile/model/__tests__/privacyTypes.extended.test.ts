import { describe, it, expect } from 'vitest';
import { DIMENSION_TO_KEY } from '../privacyTypes';

describe('privacyTypes (Extended)', () => {
  it('maps privacy dimensions to API keys', () => {
    expect(DIMENSION_TO_KEY.LAST_SEEN).toBe('lastSeen');
    expect(DIMENSION_TO_KEY.BIO).toBe('bio');
  });
});
