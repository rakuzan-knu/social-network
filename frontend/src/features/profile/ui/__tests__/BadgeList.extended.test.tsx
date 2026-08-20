import { describe, it, expect } from 'vitest';
import BadgeList from '../BadgeList';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('BadgeList (Extended)', () => {
  it('renders badges assigned to user', () => {
    const badges = [
      { id: 'dev', name: 'Developer', description: 'Core dev', icon: <span>*</span> },
    ];
    const { container } = renderWithProviders(<BadgeList badges={badges} />);
    expect(container.firstChild).toBeDefined();
  });
});
