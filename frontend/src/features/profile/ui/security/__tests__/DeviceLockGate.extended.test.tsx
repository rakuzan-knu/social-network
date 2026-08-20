import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import DeviceLockGate from '../DeviceLockGate';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('DeviceLockGate (Extended)', () => {
  it('renders children when unlocked', () => {
    renderWithProviders(
      <DeviceLockGate>
        <div data-testid="protected-child">Protected Content</div>
      </DeviceLockGate>,
    );
    expect(screen.getByTestId('protected-child')).toBeInTheDocument();
  });
});
