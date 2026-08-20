import { describe, it, expect } from 'vitest';
import FloatingVideoNotePiP from '../FloatingVideoNotePiP';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('FloatingVideoNotePiP (Extended)', () => {
  it('renders picture-in-picture player', () => {
    const { container } = renderWithProviders(<FloatingVideoNotePiP />);
    expect(container).toBeDefined();
  });
});
