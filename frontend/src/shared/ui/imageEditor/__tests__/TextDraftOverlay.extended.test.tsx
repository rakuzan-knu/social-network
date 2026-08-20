import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import TextDraftOverlay from '../TextDraftOverlay';

describe('TextDraftOverlay (Extended)', () => {
  const createMockCanvas = () => {
    const parent = document.createElement('div');
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    parent.appendChild(canvas);
    document.body.appendChild(parent);

    vi.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 50,
      width: 400,
      height: 300,
      right: 500,
      bottom: 350,
      x: 100,
      y: 50,
      toJSON: () => {},
    });

    vi.spyOn(parent, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 50,
      width: 400,
      height: 300,
      right: 500,
      bottom: 350,
      x: 100,
      y: 50,
      toJSON: () => {},
    });

    return { canvas, parent };
  };

  it('renders textarea with draft value and calls onChange on typing', () => {
    const { canvas, parent } = createMockCanvas();
    const canvasRef = { current: canvas };
    const onChange = vi.fn();
    const onCommit = vi.fn();

    render(
      <TextDraftOverlay
        canvasRef={canvasRef}
        draft={{ x: 100, y: 150, value: 'Initial text' }}
        color="#ffffff"
        fontSize={24}
        onChange={onChange}
        onCommit={onCommit}
      />,
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Initial text');

    fireEvent.change(textarea, { target: { value: 'Updated draft' } });
    expect(onChange).toHaveBeenCalledWith('Updated draft');

    document.body.removeChild(parent);
  });

  it('commits on blur event', () => {
    const { canvas, parent } = createMockCanvas();
    const canvasRef = { current: canvas };
    const onCommit = vi.fn();

    render(
      <TextDraftOverlay
        canvasRef={canvasRef}
        draft={{ x: 50, y: 50, value: 'Blur test' }}
        color="#ffffff"
        fontSize={20}
        onChange={vi.fn()}
        onCommit={onCommit}
      />,
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.blur(textarea);
    expect(onCommit).toHaveBeenCalledTimes(1);

    document.body.removeChild(parent);
  });

  it('commits on Enter keydown without shift key, but preserves newline with Shift+Enter', () => {
    const { canvas, parent } = createMockCanvas();
    const canvasRef = { current: canvas };
    const onCommit = vi.fn();

    render(
      <TextDraftOverlay
        canvasRef={canvasRef}
        draft={{ x: 50, y: 50, value: 'Enter test' }}
        color="#ffffff"
        fontSize={20}
        onChange={vi.fn()}
        onCommit={onCommit}
      />,
    );

    const textarea = screen.getByRole('textbox');

    // Shift + Enter should not commit
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    expect(onCommit).not.toHaveBeenCalled();

    // Plain Enter should commit
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    expect(onCommit).toHaveBeenCalledTimes(1);

    document.body.removeChild(parent);
  });
});
