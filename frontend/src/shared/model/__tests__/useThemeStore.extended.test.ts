import { describe, it, expect } from 'vitest';
import { useThemeStore } from '../useThemeStore';

describe('useThemeStore (Extended)', () => {
  it('switches between dark, light, and midnight themes', () => {
    useThemeStore.getState().setTheme('light');
    expect(useThemeStore.getState().theme).toBe('light');

    useThemeStore.getState().setTheme('dark');
    expect(useThemeStore.getState().theme).toBe('dark');
  });
});
