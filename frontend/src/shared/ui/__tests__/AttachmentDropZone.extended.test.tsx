import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AttachmentDropZone from '../AttachmentDropZone';

describe('AttachmentDropZone (Extended)', () => {
  it('renders dropzone children and handles drag events', () => {
    const onFilesDropped = vi.fn();
    render(
      <AttachmentDropZone onFilesDropped={onFilesDropped}>
        <div data-testid="child-content">Drop area child</div>
      </AttachmentDropZone>,
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    const zone = screen.getByTestId('child-content').parentElement!;

    fireEvent.dragOver(zone);
    fireEvent.dragLeave(zone);
  });
});
