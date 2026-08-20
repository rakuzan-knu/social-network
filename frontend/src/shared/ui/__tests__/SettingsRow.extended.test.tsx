import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsRow from '../SettingsRow';

describe('SettingsRow (Extended)', () => {
  it('renders label, description, and interactive control', () => {
    const handleClick = vi.fn();
    render(
      <SettingsRow
        icon={<span>*</span>}
        title="Two-factor Authentication"
        subtitle="Add an extra layer of security"
        onClick={handleClick}
      />,
    );

    expect(screen.getByText('Two-factor Authentication')).toBeInTheDocument();
    expect(screen.getByText('Add an extra layer of security')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Two-factor Authentication'));
    expect(handleClick).toHaveBeenCalled();
  });
});
