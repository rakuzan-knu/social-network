import { describe, it, expect } from 'vitest';
import { VideoPlayer } from '../VideoPlayer';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('VideoPlayer (Extended)', () => {
  it('renders custom HTML5 video player', () => {
    const { container } = renderWithProviders(<VideoPlayer src="https://example.com/video.mp4" />);
    expect(container.querySelector('video')).toBeInTheDocument();
  });
});
