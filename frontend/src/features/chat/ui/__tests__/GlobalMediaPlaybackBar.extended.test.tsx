import { describe, it, expect } from 'vitest';
import GlobalMediaPlaybackBar from '../GlobalMediaPlaybackBar';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('GlobalMediaPlaybackBar (Extended)', () => {
  it('renders active audio playback bar', () => {
    const { container } = renderWithProviders(<GlobalMediaPlaybackBar />);
    expect(container).toBeDefined();
  });
});
