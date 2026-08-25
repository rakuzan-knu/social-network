import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MarkdownContent from '../MarkdownContent';

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('MarkdownContent', () => {
  it('renders standard typography elements (bold, italic, strikethrough, blockquote)', () => {
    const markdown = '**Bold text** and *italic text* and ~~strike text~~\n\n> This is a quote';
    renderWithProviders(<MarkdownContent content={markdown} />);

    expect(screen.getByText('Bold text')).toHaveClass('font-bold');
    expect(screen.getByText('italic text')).toHaveClass('italic');
    expect(screen.getByText('strike text')).toHaveClass('line-through');
    expect(screen.getByText('This is a quote')).toBeInTheDocument();
  });

  it('renders inline code with custom styling', () => {
    const markdown = 'Use `const variable = 42;` in your script';
    renderWithProviders(<MarkdownContent content={markdown} />);

    const inlineCode = screen.getByText('const variable = 42;');
    expect(inlineCode).toHaveClass('font-mono');
    expect(inlineCode).toHaveClass('text-purple-300');
  });

  it('renders code block with interactive CodeBlock component', () => {
    const markdown = '```tsx\nexport const App = () => <div>Hello</div>;\n```';
    renderWithProviders(<MarkdownContent content={markdown} />);

    expect(screen.getByText('TSX')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  it('renders spoiler tags and reveals them on click', () => {
    const markdown = 'Here is a ||secret spoiler message|| for you.';
    renderWithProviders(<MarkdownContent content={markdown} />);

    const spoilerBtn = screen.getByTitle('Click to reveal spoiler');
    expect(spoilerBtn).toBeInTheDocument();

    fireEvent.click(spoilerBtn);
    expect(screen.getByText('secret spoiler message')).toBeInTheDocument();
  });

  it('renders mentions and hashtags', () => {
    const markdown = 'Hello @alexmercer and #nature vibes';
    renderWithProviders(<MarkdownContent content={markdown} />);

    const mentionLink = screen.getByText('@alexmercer');
    expect(mentionLink.closest('a')).toHaveAttribute('href', '/profile/alexmercer');

    const hashLink = screen.getByText('#nature');
    expect(hashLink.closest('a')).toHaveAttribute('href', '/search?q=%23nature');
  });

  it('sanitizes malicious script tags and inline XSS handlers', () => {
    const malicious =
      'Safe text <script>alert("hacked")</script> <img src="x" onerror="alert(1)" />';
    const { container } = renderWithProviders(<MarkdownContent content={malicious} />);

    expect(container.querySelector('script')).toBeNull();
    const img = container.querySelector('img');
    if (img) {
      expect(img.getAttribute('onerror')).toBeNull();
    }
  });
});
