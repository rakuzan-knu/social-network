import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { ErrorFallback } from '../ErrorFallback';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ErrorFallback (Extended)', () => {
  it('renders error boundary fallback view', () => {
    const reset = vi.fn();
    renderWithProviders(<ErrorFallback error={new Error('Test')} resetError={reset} />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
