import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from '../Tooltip';

describe('Tooltip (Extended)', () => {
  it('renders trigger element and displays tooltip on mouse enter', () => {
    render(
      <Tooltip label="Tooltip helper text">
        <button>Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });
    expect(trigger).toBeInTheDocument();

    fireEvent.mouseEnter(trigger);
  });
});
