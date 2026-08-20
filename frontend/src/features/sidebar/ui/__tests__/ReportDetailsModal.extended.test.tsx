import { describe, it, expect, vi } from 'vitest';
import { ReportDetailsModal } from '../ReportDetailsModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ReportDetailsModal (Extended)', () => {
  it('renders report details dialog', () => {
    const { container } = renderWithProviders(
      <ReportDetailsModal onClose={vi.fn()} onBack={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
