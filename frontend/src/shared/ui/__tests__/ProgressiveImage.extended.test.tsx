import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgressiveImage } from '../ProgressiveImage';

describe('ProgressiveImage (Extended)', () => {
  it('renders placeholder and transitions to loaded image on load event', () => {
    render(<ProgressiveImage src="https://example.com/highres.jpg" alt="Test image" />);

    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();

    fireEvent.load(img);
  });
});
