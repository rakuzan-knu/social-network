import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import { renderWithProviders } from '@/test/renderWithProviders';

vi.mock('@/pages/Feed/Feed', () => ({ default: () => <div>Feed Content</div> }));
vi.mock('@/pages/Profile/Profile', () => ({ default: () => <div>Profile Content</div> }));
vi.mock('@/pages/Chat/Messenger', () => ({ default: () => <div>Messenger Content</div> }));
vi.mock('@/pages/Chat/StandaloneChatPage', () => ({ default: () => <div>Chat Content</div> }));
vi.mock('@/pages/Search/SearchPage', () => ({ default: () => <div>Search Content</div> }));
vi.mock('@/widgets/sidebar/ui/Sidebar', () => ({ default: () => <div>Sidebar</div> }));
vi.mock('@/features/profile/ui/EditProfileModal', () => ({ default: () => null }));
vi.mock('@/features/posts/ui/ShareModal', () => ({ ShareModal: () => null }));
vi.mock('@/features/posts/ui/UndoHideSnackbar', () => ({ UndoHideSnackbar: () => null }));
vi.mock('@/features/profile/ui/security/DeviceLockGate', () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock('@/features/chat/ui/MessageToastViewport', () => ({ default: () => null }));
vi.mock('@/features/chat/ui/FloatingVideoNotePiP', () => ({ default: () => null }));
vi.mock('@/features/chat/model/usePresence', () => ({ usePresenceSync: vi.fn() }));

describe('App Component (Extended)', () => {
  it('renders application layout with router routes', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/'] });
    expect(container).toBeDefined();
  });

  it('renders correctly on /messages route', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/messages'] });
    expect(container).toBeDefined();
  });

  it('renders correctly on /settings route', () => {
    const { container } = renderWithProviders(<App />, { initialEntries: ['/settings'] });
    expect(container).toBeDefined();
  });
});
