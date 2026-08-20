import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FloatingCards } from '../FloatingCards';
import { MOCK_NOTIFS } from '../../model/data';

describe('FloatingCards Component (Extended)', () => {
  it('renders all mock notifications in decorative floating cards', () => {
    render(<FloatingCards />);

    MOCK_NOTIFS.forEach((notif) => {
      expect(screen.getByText(notif.name)).toBeInTheDocument();
      expect(screen.getByText(notif.action)).toBeInTheDocument();
      expect(screen.getByText(notif.initials)).toBeInTheDocument();
    });
  });
});
