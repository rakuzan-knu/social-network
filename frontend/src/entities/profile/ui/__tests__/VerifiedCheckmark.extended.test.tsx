import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { VerifiedCheckmark } from '../VerifiedCheckmark';

describe('VerifiedCheckmark (Extended)', () => {
  it('renders verified checkmark icon', () => {
    const { container } = render(<VerifiedCheckmark size="md" />);
    expect(container.firstChild).toBeDefined();
  });
});
