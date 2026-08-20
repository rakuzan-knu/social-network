import { describe, it, expect } from 'vitest';
import type { DrawTool, Stroke, TextItem } from '../types';

describe('ImageEditor Types (Extended)', () => {
  it('allows constructing valid tool stroke and text items', () => {
    const stroke: Stroke = {
      id: 'stroke-1',
      tool: 'pen' as DrawTool,
      color: '#ff0000',
      size: 4,
      points: [
        { x: 10, y: 10 },
        { x: 20, y: 20 },
      ],
    };
    expect(stroke.points.length).toBe(2);

    const textItem: TextItem = {
      id: 'txt-1',
      text: 'Hello world',
      x: 50,
      y: 50,
      color: '#ffffff',
      fontSize: 24,
    };
    expect(textItem.text).toBe('Hello world');
  });
});
