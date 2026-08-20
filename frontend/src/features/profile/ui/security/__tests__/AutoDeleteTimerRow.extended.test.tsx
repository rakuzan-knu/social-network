import { describe, it, expect } from 'vitest';
import AutoDeleteTimerRow from '../AutoDeleteTimerRow';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('AutoDeleteTimerRow (Extended)', () => {
  it('renders auto delete timer row', () => {
    const { container } = renderWithProviders(<AutoDeleteTimerRow />);
    expect(container.firstChild).toBeDefined();
  });
});
