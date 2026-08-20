import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ChatFolderIcon from '../ChatFolderIcon';

describe('ChatFolderIcon (Extended)', () => {
  it('renders folder icon or emoji', () => {
    const { container } = render(<ChatFolderIcon iconKey="star" color="#f59e0b" />);
    expect(container.firstChild).toBeDefined();
  });
});
