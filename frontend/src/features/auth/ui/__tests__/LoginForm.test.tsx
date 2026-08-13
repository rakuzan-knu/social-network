import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LoginForm } from '../LoginForm';
import { useAuthMutations } from '../../api/useAuth';

vi.mock('../../api/useAuth', () => ({
  useAuthMutations: vi.fn(),
}));

const mockedUseAuthMutations = vi.mocked(useAuthMutations);

function setupMutations(overrides?: {
  isPending?: boolean;
  mutateAsyncImpl?: (data: unknown) => Promise<unknown>;
}) {
  const mutateAsync = vi.fn(
    overrides?.mutateAsyncImpl ??
      (() =>
        Promise.resolve({
          accessToken: 'mock-token',
          refreshToken: 'mock-refresh-token',
          user: { id: '1', username: 'testuser', displayName: 'Test User' },
        })),
  );
  const mutate = vi.fn();
  mockedUseAuthMutations.mockReturnValue({
    loginMutation: { mutate, mutateAsync, isPending: overrides?.isPending ?? false } as never,
    registerMutation: { mutate: vi.fn(), mutateAsync: vi.fn(), isPending: false } as never,
    findAccountMutation: { mutate: vi.fn(), mutateAsync: vi.fn(), isPending: false } as never,
    resetMutation: { mutate: vi.fn(), mutateAsync: vi.fn(), isPending: false } as never,
  });
  return mutateAsync;
}

function renderLoginForm(initialEntries: string[] = ['/login']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/feed" element={<div>Feed Page</div>} />
        <Route path="/forgot-password" element={<div>Forgot password page</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('LoginForm', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the identity and password fields with a submit button', () => {
    setupMutations();

    renderLoginForm();

    expect(screen.getByPlaceholderText('Email address or phone number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty fields', async () => {
    setupMutations();
    const user = userEvent.setup();
    renderLoginForm();

    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() =>
      expect(
        screen.getByText('Please enter a valid email address or phone number.'),
      ).toBeInTheDocument(),
    );
    expect(screen.getByText('Password must contain at least 6 characters.')).toBeInTheDocument();
  });

  it('toggles password visibility when the eye icon is clicked', async () => {
    setupMutations();
    const user = userEvent.setup();
    renderLoginForm();
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(passwordInput.parentElement!.querySelector('svg')!);

    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('submits valid credentials and navigates to /feed on success', async () => {
    const mutateAsync = setupMutations();
    const user = userEvent.setup();
    renderLoginForm();

    await user.type(screen.getByPlaceholderText('Email address or phone number'), 'user@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    expect(mutateAsync).toHaveBeenCalledWith({ identity: 'user@test.com', password: 'secret1' });
    await waitFor(() => expect(screen.getByText('Feed Page')).toBeInTheDocument());
  });

  it('shows the user-not-found error when the server responds with USER_NOT_FOUND', async () => {
    setupMutations({
      mutateAsyncImpl: () =>
        Promise.reject({
          isAxiosError: true,
          response: { status: 404, data: { message: 'USER_NOT_FOUND' } },
        }),
    });
    const user = userEvent.setup();
    renderLoginForm();

    await user.type(screen.getByPlaceholderText('Email address or phone number'), 'user@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() =>
      expect(screen.getByText(/is not associated with any account/)).toBeInTheDocument(),
    );
  });

  it('shows the wrong-password error when the server responds with INVALID_PASSWORD', async () => {
    setupMutations({
      mutateAsyncImpl: () =>
        Promise.reject({
          isAxiosError: true,
          response: { status: 401, data: { message: 'INVALID_PASSWORD' } },
        }),
    });
    const user = userEvent.setup();
    renderLoginForm();

    await user.type(screen.getByPlaceholderText('Email address or phone number'), 'user@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() =>
      expect(screen.getByText('You entered an incorrect password.')).toBeInTheDocument(),
    );
  });

  it('shows a generic error banner for a non-axios error', async () => {
    setupMutations({
      mutateAsyncImpl: () => Promise.reject(new Error('network down')),
    });
    const user = userEvent.setup();
    renderLoginForm();

    await user.type(screen.getByPlaceholderText('Email address or phone number'), 'user@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() =>
      expect(screen.getByText(/You entered incorrect credentials/)).toBeInTheDocument(),
    );
  });

  it('shows a generic error banner for an axios error with an unmapped status', async () => {
    setupMutations({
      mutateAsyncImpl: () =>
        Promise.reject({ isAxiosError: true, response: { status: 500, data: {} } }),
    });
    const user = userEvent.setup();
    renderLoginForm();

    await user.type(screen.getByPlaceholderText('Email address or phone number'), 'user@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() =>
      expect(screen.getByText(/You entered incorrect credentials/)).toBeInTheDocument(),
    );
  });

  it('clears previous errors on a fresh submit attempt', async () => {
    let call = 0;
    setupMutations({
      mutateAsyncImpl: () => {
        call += 1;
        if (call === 1) {
          return Promise.reject({
            isAxiosError: true,
            response: { status: 401, data: { message: 'INVALID_PASSWORD' } },
          });
        }
        return Promise.resolve({
          accessToken: 'mock-token',
          refreshToken: 'mock-refresh-token',
          user: { id: '1', username: 'testuser', displayName: 'Test User' },
        });
      },
    });
    const user = userEvent.setup();
    renderLoginForm();
    await user.type(screen.getByPlaceholderText('Email address or phone number'), 'user@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Log in' }));
    await waitFor(() =>
      expect(screen.getByText('You entered an incorrect password.')).toBeInTheDocument(),
    );

    await user.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => expect(screen.getByText('Feed Page')).toBeInTheDocument());
  });

  it('disables the submit button and shows a spinner while the mutation is pending', () => {
    setupMutations({ isPending: true });

    renderLoginForm();

    expect(screen.queryByRole('button', { name: 'Log in' })).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('links "Forgot password?" to the forgot-password page', async () => {
    setupMutations();
    const user = userEvent.setup();
    renderLoginForm();

    await user.click(screen.getByText('Forgot password?'));

    expect(screen.getByText('Forgot password page')).toBeInTheDocument();
  });
});
