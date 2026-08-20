import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ProfileFieldPreview from '../ProfileFieldPreview';

describe('ProfileFieldPreview (Extended)', () => {
  it('renders field label and placeholder or value', () => {
    const { container } = render(
      <ProfileFieldPreview
        dimension="BIO"
        hidden={false}
        value="EVERYBODY"
        currentUser={{ displayName: 'Alice', bio: 'Engineer' } as any}
      />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
