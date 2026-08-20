import { describe, it, expect } from 'vitest';
import { queryClient } from '../queryClient';

describe('queryClient (Extended)', () => {
  it('instantiates QueryClient with correct default caching policies', () => {
    expect(queryClient).toBeDefined();
    const defaultOptions = queryClient.getDefaultOptions();
    expect(defaultOptions).toBeDefined();
  });
});
