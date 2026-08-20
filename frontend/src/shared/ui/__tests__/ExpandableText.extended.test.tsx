import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExpandableText } from '../ExpandableText';

describe('ExpandableText (Extended)', () => {
  it('renders short text without expansion button', () => {
    render(<ExpandableText text="Short text" />);
    expect(screen.getByText('Short text')).toBeInTheDocument();
  });
});
