import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { CreateCollectionModal } from '../CreateCollectionModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('CreateCollectionModal (Extended)', () => {
  it('renders create collection dialog with name input', () => {
    renderWithProviders(
      <CreateCollectionModal isOpen={true} savedPosts={[]} onClose={vi.fn()} onCreate={vi.fn()} />,
    );
    expect(screen.getByText('New collection')).toBeInTheDocument();
  });
});
