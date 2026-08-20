import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { FormattedText } from '../FormattedText';
import { renderWithProviders } from '@/test/renderWithProviders';

// Mock MiniProfileHoverCard to keep test lightweight
vi.mock('@/entities/profile/ui/MiniProfileHoverCard', () => ({
  MiniProfileHoverCard: ({
    children,
    username,
  }: {
    children: React.ReactNode;
    username: string;
  }) => <span data-testid={`hovercard-${username}`}>{children}</span>,
}));

describe('FormattedText (Extended)', () => {
  it('returns null when text is empty string', () => {
    const { container } = renderWithProviders(<FormattedText text="" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders plain text as is without formatting links', () => {
    renderWithProviders(<FormattedText text="Hello world, this is a plain message." />);
    expect(screen.getByText('Hello world, this is a plain message.')).toBeInTheDocument();
  });

  it('formats mentions (@alice) into profile links and attaches MiniProfileHoverCard', () => {
    renderWithProviders(<FormattedText text="Hey @alice, how are you doing today?" />);

    const mentionLink = screen.getByRole('link', { name: '@alice' });
    expect(mentionLink).toBeInTheDocument();
    expect(mentionLink).toHaveAttribute('href', '/profile/alice');
    expect(screen.getByTestId('hovercard-alice')).toBeInTheDocument();
    expect(screen.getByText(/how are you doing today\?/)).toBeInTheDocument();
  });

  it('handles mentions with trailing punctuation without including punctuation in link handle', () => {
    renderWithProviders(<FormattedText text="Check this out: @bob... and @carol!" />);

    const bobLink = screen.getByRole('link', { name: '@bob' });
    expect(bobLink).toHaveAttribute('href', '/profile/bob');

    const carolLink = screen.getByRole('link', { name: '@carol' });
    expect(carolLink).toHaveAttribute('href', '/profile/carol');
  });

  it('formats hashtags (#react) into search navigation links', () => {
    renderWithProviders(<FormattedText text="Building web apps with #react and #typescript!" />);

    const reactLink = screen.getByRole('link', { name: '#react' });
    expect(reactLink).toHaveAttribute('href', '/search?q=%23react');

    const tsLink = screen.getByRole('link', { name: '#typescript' });
    expect(tsLink).toHaveAttribute('href', '/search?q=%23typescript');
  });

  it('handles Cyrillic usernames and hashtags correctly', () => {
    renderWithProviders(<FormattedText text="Привет @иван, добро пожаловать в #соцсеть!" />);

    const userLink = screen.getByRole('link', { name: '@иван' });
    expect(userLink).toHaveAttribute('href', '/profile/иван');

    const tagLink = screen.getByRole('link', { name: '#соцсеть' });
    expect(tagLink).toHaveAttribute(
      'href',
      '/search?q=%23%D1%81%D0%BE%D1%86%D1%81%D0%B5%D1%82%D1%8C',
    );
  });

  it('applies custom className to wrapper span', () => {
    const { container } = renderWithProviders(
      <FormattedText text="Sample text" className="custom-font-style" />,
    );
    expect(container.firstChild).toHaveClass('custom-font-style');
  });
});
