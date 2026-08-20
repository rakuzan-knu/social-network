import { describe, it, expect } from 'vitest';
import { reportApi } from '../reportApi';

describe('reportApi (Extended)', () => {
  it('defines report submit method', () => {
    expect(reportApi.submitReport).toBeDefined();
  });
});
