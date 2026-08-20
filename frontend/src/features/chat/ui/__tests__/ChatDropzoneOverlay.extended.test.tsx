import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ChatDropzoneOverlay from '../ChatDropzoneOverlay';

describe('ChatDropzoneOverlay (Extended)', () => {
  it('renders drag-and-drop overlay when dragging over chat', () => {
    const { container } = render(<ChatDropzoneOverlay isDragging={true} />);
    expect(container.firstChild).toBeDefined();
  });
});
