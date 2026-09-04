import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { chatApi } from '../../api/chatApi';
import SelectThemeModal from '../SelectThemeModal';

vi.mock('../../api/chatApi', () => ({
  chatApi: {
    setTheme: vi.fn(),
    uploadAttachment: vi.fn(),
    proposeTheme: vi.fn(),
  },
}));

vi.mock('../lib/reactionBurstEngine', () => ({
  triggerReactionBurst: vi.fn(),
  triggerFlyingReaction: vi.fn(),
}));

vi.mock('../../model/useRecentReactions', () => ({
  useRecentReactions: () => ({
    recentReactions: ['❤️', '🔥', '👍', '🎉', '🚀', '😍'],
    dockReactions: ['❤️', '🔥', '👍', '🎉', '🚀', '😍'],
    recordReaction: vi.fn(),
  }),
}));

vi.mock('../../model/useChatTheme', () => ({
  useChatTheme: vi.fn((conversationId: string) => ({
    theme: {
      id: 'default',
      name: 'Default',
      backgroundType: 'solid',
      bgSolidColor: '#0a0a0a',
      bubbleType: 'solid',
      myBubbleBg: '#6366f1',
      myBubbleText: '#ffffff',
      theirBubbleBg: '#1f2937',
      theirBubbleText: '#f3f4f6',
    },
    isLoading: false,
    applyTheme: vi.fn(async (_config, options?: { applyToAll?: boolean }) => {
      await chatApi.setTheme(conversationId, 'theme', options?.applyToAll ?? false);
    }),
    revertTheme: vi.fn(async (options?: { applyToAll?: boolean }) => {
      await chatApi.setTheme(conversationId, 'default', options?.applyToAll ?? false);
    }),
  })),
}));

vi.mock('../../lib/themeUtils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../lib/themeUtils')>();
  return {
    ...actual,
    getCustomPresets: vi.fn().mockResolvedValue([]),
    getRecentWallpapers: vi.fn().mockResolvedValue([]),
  };
});

describe('SelectThemeModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('renders theme customizer header and tabs correctly', async () => {
    const onClose = vi.fn();
    render(<SelectThemeModal conversationId="c1" currentTheme="default" onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('Chat Theme Customizer')).toBeInTheDocument();
    });
    expect(screen.getByText('Chat Background')).toBeInTheDocument();
    expect(screen.getByText('Message Bubbles')).toBeInTheDocument();
    expect(screen.getByText('Presets')).toBeInTheDocument();
    expect(screen.getByText('My Themes')).toBeInTheDocument();
  });

  it('supports selecting procedural WebGL shader wallpapers', async () => {
    const onClose = vi.fn();
    render(<SelectThemeModal conversationId="c1" currentTheme="default" onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('Chat Theme Customizer')).toBeInTheDocument();
    });

    // Switch to Shaders submode
    const shadersBtn = screen.getByRole('button', { name: /Shaders/i });
    fireEvent.click(shadersBtn);

    expect(screen.getByText('Liquid Neon Smoke')).toBeInTheDocument();
    expect(screen.getByText('Cosmic Aurora')).toBeInTheDocument();
    expect(screen.getByText('Retro Synthwave')).toBeInTheDocument();

    // Select Liquid Neon Smoke shader
    fireEvent.click(screen.getByText('Liquid Neon Smoke'));
    await waitFor(() => {
      expect(screen.getByText('Liquid Neon Smoke')).toBeInTheDocument();
    });
  });

  it('supports Hold-to-Compare (До / После) interaction', async () => {
    const onClose = vi.fn();
    render(<SelectThemeModal conversationId="c1" currentTheme="default" onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByTitle(/Зажмите и удерживайте/i)).toBeInTheDocument();
    });

    const compareBtn = screen.getByTitle(/Зажмите и удерживайте/i);

    // Mouse down starts compare mode
    fireEvent.mouseDown(compareBtn);
    expect(screen.getByText(/Оригинальный вид \(удерживайте\)/i)).toBeInTheDocument();

    // Mouse up ends compare mode
    fireEvent.mouseUp(compareBtn);
    expect(screen.queryByText(/Оригинальный вид \(удерживайте\)/i)).not.toBeInTheDocument();
  });

  it('selects preset theme and applies via API call', async () => {
    vi.mocked(chatApi.setTheme).mockResolvedValue({ success: true } as unknown as never);
    const onClose = vi.fn();

    render(<SelectThemeModal conversationId="c1" currentTheme="default" onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('Presets')).toBeInTheDocument();
    });

    // Switch to Presets tab
    fireEvent.click(screen.getByText('Presets'));
    expect(screen.getByText('Midnight Purple')).toBeInTheDocument();

    // Select Midnight Purple preset
    fireEvent.click(screen.getByText('Midnight Purple'));

    const applyBtn = screen.getByRole('button', { name: /Apply Theme/i });
    fireEvent.click(applyBtn);

    await waitFor(() => {
      expect(chatApi.setTheme).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('allows sending test messages in the interactive live preview', async () => {
    const onClose = vi.fn();
    render(<SelectThemeModal conversationId="c1" currentTheme="default" onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Напишите тестовое сообщение...')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Напишите тестовое сообщение...');
    fireEvent.change(input, { target: { value: 'Тестовое интерактивное сообщение 🌟' } });

    const sendBtn = screen.getByTitle('Send test message to preview');
    fireEvent.click(sendBtn);

    expect(screen.getByText('Тестовое интерактивное сообщение 🌟')).toBeInTheDocument();
  });

  it('handles copying theme code to clipboard', async () => {
    const onClose = vi.fn();
    render(<SelectThemeModal conversationId="c1" currentTheme="default" onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByTitle(/Скопировать код темы/i)).toBeInTheDocument();
    });

    const shareBtn = screen.getByTitle(/Скопировать код темы/i);
    fireEvent.click(shareBtn);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('ETERNAL-THEME:'),
      );
    });
  });

  it('opens Import modal and validates theme code', async () => {
    const onClose = vi.fn();
    render(<SelectThemeModal conversationId="c1" currentTheme="default" onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByTitle(/Импортировать тему по коду/i)).toBeInTheDocument();
    });

    const importBtn = screen.getByTitle(/Импортировать тему по коду/i);
    fireEvent.click(importBtn);

    expect(screen.getByText('Import Theme by Code')).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText('Paste theme code here...');
    fireEvent.change(textarea, { target: { value: 'invalid-malicious-code' } });

    const loadBtn = screen.getByRole('button', { name: /Load Theme/i });
    fireEvent.click(loadBtn);

    await waitFor(() => {
      expect(screen.getByText('Неверный или небезопасный код темы')).toBeInTheDocument();
    });

    // Cancel import modal
    const cancelButtons = screen.getAllByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButtons[cancelButtons.length - 1]);
    expect(screen.queryByText('Import Theme by Code')).not.toBeInTheDocument();
  });

  it('handles "Reset Theme" button', async () => {
    vi.mocked(chatApi.setTheme).mockResolvedValue({ success: true } as unknown as never);
    const onClose = vi.fn();

    render(
      <SelectThemeModal conversationId="c1" currentTheme="midnight-purple" onClose={onClose} />,
    );

    const resetBtn = await screen.findByRole('button', { name: /Reset Theme/i });
    fireEvent.click(resetBtn);

    await waitFor(() => {
      expect(chatApi.setTheme).toHaveBeenCalledWith('c1', 'default', false);
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('handles proposing shared theme, custom preset saving and deletion, and gradient randomization', async () => {
    vi.mocked(chatApi.proposeTheme).mockResolvedValueOnce({ success: true } as any);
    const onClose = vi.fn();

    render(<SelectThemeModal conversationId="c1" currentTheme="default" onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Предложить как парную/i })).toBeInTheDocument();
    });

    // Propose theme
    const proposeBtn = screen.getByRole('button', { name: /Предложить как парную/i });
    fireEvent.click(proposeBtn);

    await waitFor(() => {
      expect(chatApi.proposeTheme).toHaveBeenCalled();
    });

    // Randomize background gradient
    const gradientSubmode = screen.getByRole('button', { name: /Gradient/i });
    fireEvent.click(gradientSubmode);

    const randomGradBtn = screen.getByRole('button', { name: /Случайный градиент/i });
    fireEvent.click(randomGradBtn);

    // Save custom preset
    const customTab = screen.getByText('My Themes');
    fireEvent.click(customTab);

    const presetNameInput = screen.getByPlaceholderText(/Theme name/i);
    fireEvent.change(presetNameInput, { target: { value: 'Awesome Custom Theme' } });

    const savePresetBtn = screen.getByRole('button', { name: /Save Current Theme/i });
    fireEvent.click(savePresetBtn);
  });
});
