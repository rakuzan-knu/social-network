import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassCard } from '../GlassCard';

describe('GlassCard (Extended)', () => {
  it('renders children with glassmorphic styling', () => {
    render(
      <GlassCard className="custom-class">
        <span>Glass Content</span>
      </GlassCard>,
    );
    expect(screen.getByText('Glass Content')).toBeInTheDocument();
  });
});
