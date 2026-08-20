import { describe, it, expect } from 'vitest';
import { flipPointX, rotatePoint90 } from '../imageEditorGeometry';

describe('imageEditorGeometry (Extended)', () => {
  it('flips X coordinates relative to canvas width', () => {
    const pt = { x: 20, y: 50 };
    const flipped = flipPointX(pt, 100);
    expect(flipped).toEqual({ x: 80, y: 50 });
  });

  it('rotates point 90 degrees clockwise relative to canvas dimensions', () => {
    const pt = { x: 10, y: 20 };
    const rotated = rotatePoint90(pt, 100, 200);
    expect(rotated).toEqual({ x: 180, y: 10 });
  });
});
