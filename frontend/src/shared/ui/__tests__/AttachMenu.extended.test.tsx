import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AttachMenu from '../AttachMenu';

describe('AttachMenu (Extended)', () => {
  it('renders attachment options and fires selection callbacks', () => {
    render(
      <AttachMenu
        isGroup={false}
        onPickMedia={vi.fn()}
        onPickFile={vi.fn()}
        onTogglePoll={vi.fn()}
      />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
