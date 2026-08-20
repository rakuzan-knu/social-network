import { describe, it, expect } from 'vitest';
import type { MuteOption } from '../chatUiTypes';

describe('chatUiTypes (Extended)', () => {
  it('types mute duration dropdown options', () => {
    const option: MuteOption = {
      value: 'UNTIL_CUSTOM' as any,
      label: 'For 8 hours',
    };
    expect(option.label).toBe('For 8 hours');
  });
});
