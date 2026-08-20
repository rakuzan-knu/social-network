import { describe, it, expect } from 'vitest';
import { notifyAuthChange, initCrossTabSync } from '../broadcastSync';

describe('broadcastSync (Extended)', () => {
  it('sends auth broadcast notifications without throwing', () => {
    expect(() => notifyAuthChange('LOGOUT')).not.toThrow();
  });

  it('initializes cross-tab sync listener', () => {
    expect(() => initCrossTabSync()).not.toThrow();
  });
});
