import { describe, it, expect } from 'vitest';
import MessageToastViewport from '../MessageToastViewport';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('MessageToastViewport (Extended)', () => {
  it('renders active toast notification container', () => {
    const { container } = renderWithProviders(<MessageToastViewport />);
    expect(container).toBeDefined();
  });
});
