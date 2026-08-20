import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from '../EmptyState';

describe('EmptyState (Extended)', () => {
  it('renders title, subtitle, and icon', () => {
    render(
      <EmptyState
        icon={<span>*</span>}
        title="No items found"
        subtitle="Try adjusting your search criteria"
      />,
    );

    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search criteria')).toBeInTheDocument();
  });
});
