import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SettingsPanelHost } from '../SettingsPanelHost';

describe('SettingsPanelHost (Extended)', () => {
  it('renders title, description, and children container', () => {
    render(
      <SettingsPanelHost>
        <div data-testid="panel-child">Child Setting</div>
      </SettingsPanelHost>,
    );

    expect(screen.getByTestId('panel-child')).toBeInTheDocument();
  });
});
