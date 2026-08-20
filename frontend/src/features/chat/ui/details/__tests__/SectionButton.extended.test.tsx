import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SectionButton, ExpandableSection } from '../SectionButton';

describe('SectionButton (Extended)', () => {
  it('renders button and expands section', () => {
    const onClick = vi.fn();
    render(<SectionButton icon={<span>*</span>} label="Shared Files" onClick={onClick} />);
    expect(screen.getByText('Shared Files')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Shared Files'));
    expect(onClick).toHaveBeenCalled();

    render(
      <ExpandableSection label="Notifications" isOpen={true} onToggle={vi.fn()}>
        <div>Section Body</div>
      </ExpandableSection>,
    );
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Section Body')).toBeInTheDocument();
  });
});
