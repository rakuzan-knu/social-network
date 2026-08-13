import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FeedPage from '../Feed';
import { useAuthStore } from '../../../shared/model/useAuthStore';
import { resetUIStore } from '../../../test/resetUIStore';
import { renderWithProviders } from '../../../test/renderWithProviders';
import { server } from '../../../test/mocks/server';
import { http, HttpResponse } from 'msw';

vi.mock('emoji-picker-react', () => ({
  default: () => <div data-testid="mock-emoji-picker" />,
  Theme: { DARK: 'dark' },
  EmojiStyle: { APPLE: 'apple' },
}));

describe('FeedPage', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth('user-1');
  });

  afterEach(() => {
    resetUIStore();
    useAuthStore.getState().clearAuth();
    vi.restoreAllMocks();
  });

  it('renders the create-post composer', async () => {
    renderWithProviders(<FeedPage />);

    expect(screen.getByPlaceholderText('Що нового?')).toBeInTheDocument();
  });

  it('renders the feed with posts', async () => {
    renderWithProviders(<FeedPage />);

    expect(await screen.findByText('Thats fire!')).toBeInTheDocument();
    expect(await screen.findByText('Eternal CEO is here!')).toBeInTheDocument();
  });

  it('renders the empty-feed placeholder when there are no posts', async () => {
    server.use(
      http.get('http://localhost:3000/api/posts', () =>
        HttpResponse.json({ posts: [], nextCursor: null }),
      ),
    );

    renderWithProviders(<FeedPage />);

    expect(await screen.findByText("There's nothing here yet...")).toBeInTheDocument();
  });

  it('submits a new post and clears the composer', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FeedPage />);

    await user.type(screen.getByPlaceholderText('Що нового?'), 'Hello feed');
    await user.click(screen.getByText('Опублікувати'));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Що нового?')).toHaveValue('');
    });
  });

  it('does not publish an empty post', async () => {
    renderWithProviders(<FeedPage />);

    const publishBtn = screen.getByText('Опублікувати');
    expect(publishBtn).toBeDisabled();
  });
});
