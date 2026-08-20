import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ChatThreadHeader from '../ChatThreadHeader';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ChatThreadHeader (Extended)', () => {
  const display = { title: 'Alice', avatarUrl: null, subtitle: 'online', isGroup: false };

  it('renders chat header with user title and actions', () => {
    renderWithProviders(
      <ChatThreadHeader
        display={display as any}
        otherUserId="u2"
        isOtherTyping={false}
        isDetailsOpen={false}
        onToggleDetails={vi.fn()}
      />,
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
