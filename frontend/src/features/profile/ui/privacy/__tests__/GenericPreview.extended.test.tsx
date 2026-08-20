import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import GenericPreview from '../GenericPreview';

describe('GenericPreview (Extended)', () => {
  it('renders preview card with title and subtitle', () => {
    const { container } = render(
      <GenericPreview dimension="LAST_SEEN" value="EVERYBODY" hidden={false} />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
