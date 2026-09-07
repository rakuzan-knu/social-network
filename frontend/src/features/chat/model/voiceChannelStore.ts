import { create } from 'zustand';

export interface VoiceParticipant {
  userId: string;
  username: string;
  displayName?: string;
  avatar?: string | null;
  isMuted: boolean;
  isSpeaking: boolean;
}

interface VoiceChannelState {
  activeVoiceChannelId: string | null;
  activeVoiceChannelTitle: string | null;
  participants: VoiceParticipant[];
  isMuted: boolean;
  isDeafened: boolean;

  joinVoiceChannel: (conversationId: string, title: string, currentUser?: VoiceParticipant) => void;
  leaveVoiceChannel: () => void;
  toggleMute: () => void;
  toggleDeafen: () => void;
  setParticipantSpeaking: (userId: string, isSpeaking: boolean) => void;
  setParticipantMuted: (userId: string, isMuted: boolean) => void;
  addParticipant: (participant: VoiceParticipant) => void;
  removeParticipant: (userId: string) => void;
  setParticipants: (participants: VoiceParticipant[]) => void;
}

export const useVoiceChannelStore = create<VoiceChannelState>((set) => ({
  activeVoiceChannelId: null,
  activeVoiceChannelTitle: null,
  participants: [],
  isMuted: false,
  isDeafened: false,

  joinVoiceChannel: (conversationId, title, currentUser) =>
    set((state) => {
      const initialParticipants = currentUser
        ? [currentUser, ...state.participants.filter((p) => p.userId !== currentUser.userId)]
        : state.participants;
      return {
        activeVoiceChannelId: conversationId,
        activeVoiceChannelTitle: title,
        participants: initialParticipants,
      };
    }),

  leaveVoiceChannel: () =>
    set({
      activeVoiceChannelId: null,
      activeVoiceChannelTitle: null,
      participants: [],
      isMuted: false,
      isDeafened: false,
    }),

  toggleMute: () =>
    set((state) => {
      const nextMuted = !state.isMuted;
      return {
        isMuted: nextMuted,
        participants: state.participants.map((p) =>
          p.userId === 'current-user' ? { ...p, isMuted: nextMuted } : p,
        ),
      };
    }),

  toggleDeafen: () =>
    set((state) => {
      const nextDeafened = !state.isDeafened;
      return {
        isDeafened: nextDeafened,
        isMuted: nextDeafened ? true : state.isMuted,
      };
    }),

  setParticipantSpeaking: (userId, isSpeaking) =>
    set((state) => ({
      participants: state.participants.map((p) => (p.userId === userId ? { ...p, isSpeaking } : p)),
    })),

  setParticipantMuted: (userId, isMuted) =>
    set((state) => ({
      participants: state.participants.map((p) => (p.userId === userId ? { ...p, isMuted } : p)),
    })),

  addParticipant: (participant) =>
    set((state) => {
      if (state.participants.some((p) => p.userId === participant.userId)) {
        return state;
      }
      return {
        participants: [...state.participants, participant],
      };
    }),

  removeParticipant: (userId) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.userId !== userId),
    })),

  setParticipants: (participants) => set({ participants }),
}));
