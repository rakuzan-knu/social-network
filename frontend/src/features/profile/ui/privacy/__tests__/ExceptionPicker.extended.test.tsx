import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import ExceptionPicker from '../ExceptionPicker';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ExceptionPicker (Extended)', () => {
  it('renders exception user search and selection list', () => {
    renderWithProviders(<ExceptionPicker dimension="BIO" mode="ALLOW" />);
    expect(screen.getByPlaceholderText(/search people/i)).toBeInTheDocument();
  });
});
