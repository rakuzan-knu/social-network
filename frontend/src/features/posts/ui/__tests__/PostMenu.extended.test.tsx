import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { PostMenu } from '../PostMenu';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PostMenu (Extended)', () => {
  it('renders post actions dropdown menu for owner', () => {
    renderWithProviders(
      <PostMenu postId="p-1" isOwner={true} onEdit={vi.fn()} onDelete={vi.fn()} />,
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toBeDefined();
    fireEvent.click(trigger);
  });
});
