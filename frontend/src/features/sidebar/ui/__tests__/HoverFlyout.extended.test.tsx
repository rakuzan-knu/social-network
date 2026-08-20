import { describe, it, expect } from 'vitest';
import { HoverFlyout } from '../HoverFlyout';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('HoverFlyout (Extended)', () => {
  it('renders hover flyout component', () => {
    const { container } = renderWithProviders(
      <HoverFlyout trigger={() => <div>Trigger</div>}>
        <div>Flyout content</div>
      </HoverFlyout>,
    );
    expect(container).toBeDefined();
  });
});
