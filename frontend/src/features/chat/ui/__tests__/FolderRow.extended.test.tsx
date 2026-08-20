import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FolderRow from '../FolderRow';

describe('FolderRow (Extended)', () => {
  it('renders folder item row', () => {
    render(
      <FolderRow
        icon={<span>*</span>}
        title="Unread"
        action="filter"
        color="#3b82f6"
        onClick={vi.fn()}
      />,
    );
    expect(screen.getByText('Unread')).toBeInTheDocument();
  });
});
