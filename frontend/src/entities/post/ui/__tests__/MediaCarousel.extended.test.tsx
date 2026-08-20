import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MediaCarousel } from '../MediaCarousel';
import { PostMedia } from '../../model/types';

vi.mock('../VideoPlayer', () => ({
  VideoPlayer: ({ src, active }: { src: string; active?: boolean }) => (
    <div data-testid="video-player" data-src={src} data-active={active ? 'true' : 'false'} />
  ),
}));

describe('MediaCarousel (Extended)', () => {
  const singleImage: PostMedia[] = [{ type: 'image', url: 'https://example.com/photo1.jpg' }];

  const multipleMedia: PostMedia[] = [
    { type: 'image', url: 'https://example.com/photo1.jpg' },
    { type: 'video', url: 'https://example.com/clip.mp4' },
    { type: 'image', url: 'https://example.com/photo2.jpg' },
  ];

  it('renders single image without navigation arrows or dots', () => {
    const { container } = render(<MediaCarousel media={singleImage} />);

    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/photo1.jpg');

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders multiple media with navigation buttons and pagination dots', () => {
    render(<MediaCarousel media={multipleMedia} />);

    const buttons = screen.getAllByRole('button');
    // 2 navigation arrows + 3 dot buttons = 5 buttons
    expect(buttons).toHaveLength(5);
  });

  it('navigates next and previous slides with wrap around', () => {
    render(<MediaCarousel media={multipleMedia} />);

    const buttons = screen.getAllByRole('button');
    const prevBtn = buttons[0];
    const nextBtn = buttons[1];

    // Starts at index 0 (photo1)
    expect(screen.getByTestId('video-player')).toHaveAttribute('data-active', 'false');

    // Click next -> index 1 (video)
    fireEvent.click(nextBtn);
    expect(screen.getByTestId('video-player')).toHaveAttribute('data-active', 'true');

    // Click next -> index 2 (photo2)
    fireEvent.click(nextBtn);
    expect(screen.getByTestId('video-player')).toHaveAttribute('data-active', 'false');

    // Click next -> wrap around to 0
    fireEvent.click(nextBtn);

    // Click prev -> wrap around to 2
    fireEvent.click(prevBtn);
    expect(screen.getByTestId('video-player')).toHaveAttribute('data-active', 'false');
  });

  it('navigates to specific slide when clicking dot indicators', () => {
    render(<MediaCarousel media={multipleMedia} />);

    const buttons = screen.getAllByRole('button');
    const dot2 = buttons[3]; // dot for index 1 (video)

    fireEvent.click(dot2);
    expect(screen.getByTestId('video-player')).toHaveAttribute('data-active', 'true');
  });
});
