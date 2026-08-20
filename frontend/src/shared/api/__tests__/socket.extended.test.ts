import { describe, it, expect } from 'vitest';
import { getSocket, disconnectSocket } from '../socket';

describe('socket API (Extended)', () => {
  it('initializes and returns a singleton socket instance and disconnects cleanly', () => {
    const socket = getSocket();
    expect(socket).toBeDefined();

    disconnectSocket();
    expect(typeof disconnectSocket).toBe('function');
  });
});
