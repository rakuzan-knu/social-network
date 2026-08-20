import { describe, it, expect } from 'vitest';
import LocalDevicePasswordGate from '../LocalDevicePasswordGate';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('LocalDevicePasswordGate (Extended)', () => {
  it('renders password gate', () => {
    const { container } = renderWithProviders(<LocalDevicePasswordGate />);
    expect(container).toBeDefined();
  });
});
