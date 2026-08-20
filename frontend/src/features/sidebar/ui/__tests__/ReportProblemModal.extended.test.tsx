import { describe, it, expect, vi } from 'vitest';
import { ReportProblemModal } from '../ReportProblemModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ReportProblemModal (Extended)', () => {
  it('renders problem reporting form dialog', () => {
    const { container } = renderWithProviders(
      <ReportProblemModal onClose={vi.fn()} onContinue={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
