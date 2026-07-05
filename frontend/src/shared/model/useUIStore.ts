import { create } from 'zustand';

interface UIState {
  isSidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  isEditProfileOpen: boolean;
  openEditProfile: () => void;
  closeEditProfile: () => void;
  isCommentModalOpen: boolean;
  activePostForComments: any | null;
  openCommentModal: (post: any) => void;
  closeCommentModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarExpanded: false,
  setSidebarExpanded: (expanded) => set({ isSidebarExpanded: expanded }),
  isEditProfileOpen: false,
  openEditProfile: () => set({ isEditProfileOpen: true }),
  closeEditProfile: () => set({ isEditProfileOpen: false }),
  isCommentModalOpen: false,
  activePostForComments: null,
  openCommentModal: (post) => set({ isCommentModalOpen: true, activePostForComments: post }),
  closeCommentModal: () => set({ isCommentModalOpen: false, activePostForComments: null }),
}));