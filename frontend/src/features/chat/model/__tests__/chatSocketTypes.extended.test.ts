import { describe, it, expect } from 'vitest';
import type { AckResponse } from '../chatSocketTypes';

describe('chatSocketTypes (Extended)', () => {
  it('types socket acknowledgment callbacks correctly', () => {
    const ack: AckResponse<{ id: string }> = {
      status: 'ok',
      message: { id: 'm-1' },
    };
    expect(ack.status).toBe('ok');
    expect(ack.message?.id).toBe('m-1');
  });
});
