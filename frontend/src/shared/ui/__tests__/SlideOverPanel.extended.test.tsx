import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SlideOverPanel from '../SlideOverPanel';
import { SettingsPanelHost } from '../SettingsPanelHost';

describe('SlideOverPanel (Extended)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders title, children, and optional headerRight in document.body by default', () => {
    render(
      <SlideOverPanel
        title="Privacy Settings"
        onClose={vi.fn()}
        headerRight={<button data-testid="header-extra">Action</button>}
      >
        <div data-testid="panel-body">Main settings controls</div>
      </SlideOverPanel>,
    );

    expect(screen.getByText('Privacy Settings')).toBeInTheDocument();
    expect(screen.getByTestId('panel-body')).toBeInTheDocument();
    expect(screen.getByTestId('header-extra')).toBeInTheDocument();
    expect(document.body).toContainElement(screen.getByTestId('panel-body'));
  });

  it('renders inside custom SettingsPanelHost container when provided', () => {
    render(
      <SettingsPanelHost>
        <SlideOverPanel title="Nested Panel" onClose={vi.fn()}>
          <span>Inside Host</span>
        </SlideOverPanel>
      </SettingsPanelHost>,
    );

    expect(screen.getByText('Nested Panel')).toBeInTheDocument();
    expect(screen.getByText('Inside Host')).toBeInTheDocument();
  });

  it('handles back button click with 180ms exit animation before calling onClose', () => {
    const onClose = vi.fn();
    render(
      <SlideOverPanel title="Panel" onClose={onClose}>
        <div>Content</div>
      </SlideOverPanel>,
    );

    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(180);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('handles window Escape key to request close with exit animation', () => {
    const onClose = vi.fn();
    render(
      <SlideOverPanel title="Panel" onClose={onClose}>
        <div>Content</div>
      </SlideOverPanel>,
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(180);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
