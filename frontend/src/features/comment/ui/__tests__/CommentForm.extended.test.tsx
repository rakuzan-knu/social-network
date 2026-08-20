import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { CommentForm } from '../CommentForm';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('CommentForm (Extended)', () => {
  it('renders reply input form', () => {
    renderWithProviders(<CommentForm currentUserHandle="johndoe" onSubmitComment={vi.fn()} />);
    expect(screen.getByPlaceholderText(/comment as johndoe/i)).toBeInTheDocument();
  });
});
