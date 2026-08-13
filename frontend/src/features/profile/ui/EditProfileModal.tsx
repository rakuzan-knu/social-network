import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  User as UserIcon,
  Palette,
  Shield,
  Hand,
  Bell,
  X,
  Upload,
  Check,
  Image as ImageIcon,
  MoveVertical,
  Loader2,
  Pencil,
  Search,
  ChevronDown,
  Lock,
  Star,
  Users,
  Moon,
  Smartphone,
  Eye,
  UserX,
  Volume2,
  LogOut,
  Link as LinkIcon,
  Plus,
  Unlink,
  ExternalLink,
  RotateCw,
} from 'lucide-react';
import { useUIStore } from '../../../shared/model/useUIStore';
import { useAuthStore } from '../../../shared/model/useAuthStore';
import { useCheckUsername } from '@/entities/profile/model/useCheckUsername';
import { USER_KEY } from '@/shared/api/queryKeys';
import { profileSchema, ProfileFormValues } from '../model/profileSchema';
import { useUploadAvatar } from '../../../shared/model/useUploadAvatar';
import { useUploadBanner } from '../../../shared/model/useUploadBanner';
import { useCurrentUser } from '@/entities/profile/model/useCurrentUser';
import { userApi } from '@/entities/profile/api/userApi';
import { useDebounce } from '@/shared/lib/useDebounce';
import { useMessageToastStore } from '../../../shared/model/useMessageToastStore';
import Avatar from '../../../shared/ui/Avatar';
import { SettingsPanelHost } from '@/shared/ui/SettingsPanelHost';
import SecurityTab from './security/SecurityTab';
import PrivacyTab from './privacy/PrivacyTab';
import NotificationsTab from './notifications/NotificationsTab';
import BadgeSettingsSection from './BadgeSettingsSection';

interface SubSection {
  id: string;
  label: string;
}

interface MainTab {
  id: string;
  label: string;
  icon: React.ElementType;
  subsections: SubSection[];
}

export default function EditProfileModal() {
  const { isEditProfileOpen, closeEditProfile } = useUIStore();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [activeTab, setActiveTab] = useState('account');
  const [activeSection, setActiveSection] = useState('sec-account-info');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({
    account: true,
    appearance: false,
    security: false,
    privacy: false,
    notifications: false,
  });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const [isAddIntegrationModalOpen, setIsAddIntegrationModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [githubInputUser, setGithubInputUser] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: currentUser } = useCurrentUser();
  const uploadAvatarMutation = useUploadAvatar();
  const uploadBannerMutation = useUploadBanner();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [localAvatarPreview, setLocalAvatarPreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [localBannerPreview, setLocalBannerPreview] = useState<string | null>(null);
  const [localBannerPos, setLocalBannerPos] = useState<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startY: number; startPos: number }>({ startY: 0, startPos: 50 });

  const avatarPreview = localAvatarPreview ?? currentUser?.avatar ?? null;
  const bannerPreview = localBannerPreview ?? currentUser?.banner ?? null;
  const bannerPos = localBannerPos ?? currentUser?.bannerPosition ?? 50;

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const subNavRef = useRef<HTMLDivElement>(null);
  const tabHeaderRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const accordionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number }>({
    top: 0,
    height: 0,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: '',
      displayName: '',
      username: '',
      onlineStatus: true,
      notifMain: true,
      notifSound: false,
    },
  });

  const usernameValue = useWatch({ control, name: 'username' });
  const debouncedUsername = useDebounce(usernameValue, 400);
  const isUsernameUnchanged = debouncedUsername === currentUser?.username;

  const shouldCheckUsername = Boolean(
    debouncedUsername && debouncedUsername.length >= 2 && !isUsernameUnchanged,
  );

  const { data: usernameStatus, isFetching: isCheckingUsername } = useCheckUsername(
    debouncedUsername || '',
    shouldCheckUsername,
  );

  const isUsernameTaken = !isUsernameUnchanged && usernameStatus?.isAvailable === false;
  const bioValue = useWatch({ control, name: 'bio' });

  const updateIndicatorPosition = useCallback(() => {
    const activeEl = itemRefs.current[activeSection];
    const containerEl = accordionRefs.current[activeTab];
    if (activeEl && containerEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      const top = activeRect.top - containerRect.top;
      const height = activeRect.height;
      if (height > 0) {
        setIndicatorStyle({ top, height });
      }
    }
  }, [activeSection, activeTab]);

  useEffect(() => {
    if (currentUser) {
      reset({
        username: currentUser.username || '',
        bio: currentUser.bio || '',
        displayName: currentUser.displayName || '',
        onlineStatus: true,
        notifMain: true,
        notifSound: false,
      });
      if (currentUser.githubUsername) {
        const t = setTimeout(() => setGithubInputUser(currentUser.githubUsername!), 0);
        return () => clearTimeout(t);
      }
    }
  }, [currentUser, reset]);

  useEffect(() => {
    if (isEditProfileOpen) {
      const t = setTimeout(() => {
        setActiveTab('account');
        setActiveSection('sec-account-info');
        setSearchQuery('');
        setExpandedTabs({
          account: true,
          appearance: false,
          security: false,
          privacy: false,
          notifications: false,
        });
        setIsLogoutModalOpen(false);
        setIsMoreMenuOpen(false);
        setIsAddIntegrationModalOpen(false);
        setSelectedPlatform(null);
        updateIndicatorPosition();
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isEditProfileOpen, updateIndicatorPosition]);

  const tabsConfig: MainTab[] = useMemo(
    () => [
      {
        id: 'account',
        label: 'Account',
        icon: UserIcon,
        subsections: [
          { id: 'sec-account-info', label: 'Account Information' },
          { id: 'sec-badges', label: 'Profile Badges' },
          { id: 'sec-integrations', label: 'Integrations' },
          { id: 'sec-reputation', label: 'Account Reputation' },
          { id: 'sec-family', label: 'Family Center' },
        ],
      },
      {
        id: 'appearance',
        label: 'Appearance',
        icon: Palette,
        subsections: [
          { id: 'sec-theme', label: 'Color Theme' },
          { id: 'sec-interface', label: 'Font Size & Layout' },
        ],
      },
      {
        id: 'security',
        label: 'Security',
        icon: Shield,
        subsections: [
          { id: 'sec-security', label: 'Password & Security' },
          { id: 'sec-autodelete', label: 'Account Auto-Deletion' },
        ],
      },
      {
        id: 'privacy',
        label: 'Privacy',
        icon: Hand,
        subsections: [
          { id: 'sec-privacy-opts', label: 'Profile Privacy' },
          { id: 'sec-blacklist', label: 'Blocked Users' },
        ],
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: Bell,
        subsections: [{ id: 'sec-notifs', label: 'Sound & Push Notifications' }],
      },
    ],
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateIndicatorPosition();
    }, 30);
    return () => clearTimeout(timer);
  }, [
    activeSection,
    expandedTabs,
    searchQuery,
    activeTab,
    isEditProfileOpen,
    updateIndicatorPosition,
  ]);

  const handleScroll = useCallback(() => {
    if (!rightPanelRef.current) return;
    const container = rightPanelRef.current;
    const containerTop = container.getBoundingClientRect().top;
    const sectionElements = container.querySelectorAll<HTMLElement>('[id^="sec-"]');

    let currentSectionId = activeSection;
    let minDiff = Infinity;

    sectionElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const diff = Math.abs(rect.top - containerTop);
      if (diff < minDiff && rect.bottom > containerTop + 40) {
        minDiff = diff;
        currentSectionId = el.id;
      }
    });

    if (currentSectionId && currentSectionId !== activeSection) {
      setActiveSection(currentSectionId);
    }
  }, [activeSection]);

  const handleSectionClick = (tabId: string, sectionId: string) => {
    if (activeTab !== tabId) {
      setActiveTab(tabId);
      setExpandedTabs((prev) => ({ ...prev, [tabId]: true }));
    }
    setActiveSection(sectionId);

    setTimeout(() => {
      const targetEl = document.getElementById(sectionId);
      if (targetEl && rightPanelRef.current) {
        const containerRect = rightPanelRef.current.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        const scrollOffset =
          targetRect.top - containerRect.top + rightPanelRef.current.scrollTop - 20;
        rightPanelRef.current.scrollTo({ top: scrollOffset, behavior: 'smooth' });
      }
      updateIndicatorPosition();
    }, 50);
  };

  const toggleTabExpanded = (tabId: string) => {
    const nextState = !expandedTabs[tabId];
    setExpandedTabs((prev) => ({ ...prev, [tabId]: nextState }));
    setActiveTab(tabId);

    const tabConfig = tabsConfig.find((t) => t.id === tabId);
    if (tabConfig && tabConfig.subsections.length > 0) {
      const firstSubId = tabConfig.subsections[0].id;
      setActiveSection(firstSubId);
      setTimeout(() => {
        if (rightPanelRef.current) {
          rightPanelRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    }

    setTimeout(() => {
      const accordionEl = accordionRefs.current[tabId];
      const navEl = subNavRef.current;
      if (accordionEl && navEl) {
        const accordionBottom = accordionEl.offsetTop + accordionEl.offsetHeight;
        const navVisibleBottom = navEl.scrollTop + navEl.clientHeight;
        if (accordionBottom > navVisibleBottom) {
          navEl.scrollTo({
            top: accordionBottom - navEl.clientHeight + 24,
            behavior: 'smooth',
          });
        }
      }
      updateIndicatorPosition();
    }, 150);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    clearAuth();
    closeEditProfile();
    navigate('/login', { replace: true });
  };

  const addToast = useMessageToastStore.getState().addToast;

  const handleLinkGitHub = async () => {
    if (!githubInputUser.trim()) return;
    await queryClient.invalidateQueries({ queryKey: [USER_KEY] });
    setIsAddIntegrationModalOpen(false);
    setSelectedPlatform(null);
    addToast({
      id: `gh-link-${Date.now()}`,
      conversationId: '',
      messageId: '',
      title: 'GitHub Connected',
      body: `Successfully linked @${githubInputUser.trim()}. Your Pull Requests will now automatically sync for Contributor badges.`,
      avatar: null,
      memberAvatars: [],
      isGroup: false,
    });
  };

  const handleConnectGithubOAuth = () => {
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.href = `${backendUrl}/api/auth/github`;
  };

  const handleSyncGitHub = async () => {
    setIsSyncing(true);
    try {
      const res = await userApi.syncGithub();
      await queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      addToast({
        id: `gh-sync-${Date.now()}`,
        conversationId: '',
        messageId: '',
        title: 'GitHub Synced',
        body: `Synced ${res.mergedPrsCount} merged Pull Request(s) for @${res.githubUsername || 'user'}.`,
        avatar: null,
        memberAvatars: [],
        isGroup: false,
      });
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      const msg =
        errorObj?.response?.data?.message || 'PR Sync rate limited. Please try again in 5 minutes.';
      addToast({
        id: `gh-sync-err-${Date.now()}`,
        conversationId: '',
        messageId: '',
        title: 'Sync Rate Limited',
        body: msg,
        avatar: null,
        memberAvatars: [],
        isGroup: false,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUnlinkGitHub = async () => {
    try {
      await userApi.unlinkGithub();
      setGithubInputUser('');
      await queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      addToast({
        id: `gh-unlink-${Date.now()}`,
        conversationId: '',
        messageId: '',
        title: 'GitHub Unlinked',
        body: 'Your GitHub account has been disconnected.',
        avatar: null,
        memberAvatars: [],
        isGroup: false,
      });
    } catch (err: unknown) {
      console.error('Error unlinking GitHub:', err);
    }
  };

  if (!isEditProfileOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        addToast({
          id: `error-${Date.now()}`,
          conversationId: '',
          messageId: '',
          title: 'Avatar upload error',
          body: 'Only image and GIF files are allowed.',
          avatar: null,
          memberAvatars: [],
          isGroup: false,
        });
        e.target.value = '';
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        addToast({
          id: `error-${Date.now()}`,
          conversationId: '',
          messageId: '',
          title: 'Avatar upload error',
          body: 'Avatar file size exceeds the maximum limit of 10 MB.',
          avatar: null,
          memberAvatars: [],
          isGroup: false,
        });
        e.target.value = '';
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLocalAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        addToast({
          id: `error-${Date.now()}`,
          conversationId: '',
          messageId: '',
          title: 'Banner upload error',
          body: 'Only image and GIF files are allowed.',
          avatar: null,
          memberAvatars: [],
          isGroup: false,
        });
        e.target.value = '';
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        addToast({
          id: `error-${Date.now()}`,
          conversationId: '',
          messageId: '',
          title: 'Banner upload error',
          body: 'Profile banner size exceeds maximum limit of 20 MB.',
          avatar: null,
          memberAvatars: [],
          isGroup: false,
        });
        e.target.value = '';
        return;
      }
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalBannerPreview(reader.result as string);
        setLocalBannerPos(50);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!bannerPreview) return;
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    dragRef.current = { startY: clientY || 0, startPos: bannerPos };
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!isDragging || !bannerPreview) return;
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    if (clientY === undefined) return;

    const deltaY = clientY - dragRef.current.startY;
    const newPos = dragRef.current.startPos - deltaY * 0.4;
    setLocalBannerPos(Math.max(0, Math.min(100, newPos)));
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (isUsernameTaken) return;
    try {
      if (!currentUser) return;

      if (avatarFile && currentUser?.id) {
        await uploadAvatarMutation.mutateAsync({
          userId: currentUser.id,
          file: avatarFile,
        });
      }

      if (bannerFile && currentUser?.id) {
        await uploadBannerMutation.mutateAsync({
          userId: currentUser.id,
          file: bannerFile,
          positionY: bannerPos,
        });
      }

      const token = localStorage.getItem('accessToken');

      const response = await fetch(`/api/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: data.username,
          displayName: data.displayName,
          bio: data.bio,
          bannerPosition: bannerPos,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile text data');
      }

      queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      if (data.username !== currentUser.username) {
        navigate(`/${data.username}`, { replace: true });
      }
      closeEditProfile();
      setAvatarFile(null);
      setBannerFile(null);
    } catch (error) {
      console.error('Saving error:', error);
    }
  };

  const handleClose = () => {
    closeEditProfile();
    setAvatarFile(null);
    setBannerFile(null);
    setLocalAvatarPreview(null);
    setLocalBannerPreview(null);
    setLocalBannerPos(null);
  };

  const filteredTabs = tabsConfig
    .map((tab) => {
      const matchingSubsections = tab.subsections.filter(
        (sub) =>
          sub.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tab.label.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      return { ...tab, subsections: matchingSubsections };
    })
    .filter(
      (tab) =>
        tab.label.toLowerCase().includes(searchQuery.toLowerCase()) || tab.subsections.length > 0,
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col sm:flex-row w-full max-w-[920px] h-[92vh] max-h-[720px] bg-[#0c0c0e]/95 backdrop-blur-2xl rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden border border-white/[0.08]"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
        >
          <X size={20} />
        </button>

        <div className="w-full sm:w-[300px] bg-[#09090b]/95 border-b sm:border-b-0 sm:border-r border-white/[0.06] p-4 flex flex-col gap-4 select-none shrink-0 overflow-x-hidden overflow-y-hidden">
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <Avatar src={avatarPreview} size="md" alt={currentUser?.displayName || 'User'} />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-white font-bold text-sm truncate">
                {currentUser?.displayName || currentUser?.username || 'User'}
              </span>
              <button
                type="button"
                onClick={() => handleSectionClick('account', 'sec-account-info')}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white transition-colors truncate"
              >
                <span>Edit profile...</span>
                <Pencil size={11} className="shrink-0" />
              </button>
            </div>
          </div>

          <div className="relative">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all duration-200"
            />
          </div>

          <div
            ref={subNavRef}
            className="relative flex-1 overflow-y-auto overflow-x-hidden pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            <nav className="flex flex-col gap-2">
              {filteredTabs.map((tab) => {
                const Icon = tab.icon;
                const isExpanded = expandedTabs[tab.id] || searchQuery.length > 0;
                const isTabActive = activeTab === tab.id;

                return (
                  <div key={tab.id} className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      ref={(el) => {
                        tabHeaderRefs.current[tab.id] = el;
                      }}
                      onClick={() => toggleTabExpanded(tab.id)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm ${
                        isTabActive
                          ? 'bg-white/[0.08] text-white'
                          : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isTabActive ? 'text-white' : 'text-gray-400'} />
                        <span>{tab.label}</span>
                      </div>
                      <ChevronDown
                        size={15}
                        className={`text-gray-500 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div
                        ref={(el) => {
                          accordionRefs.current[tab.id] = el;
                        }}
                        className="relative overflow-hidden flex flex-col gap-0.5 pl-6 py-1 animate-fadeIn"
                      >
                        <div className="absolute left-[9px] top-1 bottom-1 w-[2px] bg-white/[0.08] pointer-events-none rounded-full" />

                        {isTabActive && (
                          <div
                            className="absolute left-[8px] w-[3px] bg-white rounded-r-full shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-all duration-300 ease-out z-20 pointer-events-none"
                            style={{
                              transform: `translateY(${indicatorStyle.top}px)`,
                              height: `${indicatorStyle.height}px`,
                              opacity: indicatorStyle.height > 0 ? 1 : 0,
                            }}
                          />
                        )}

                        {tab.subsections.map((sub) => {
                          const isSubActive = activeSection === sub.id;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              ref={(el) => {
                                itemRefs.current[sub.id] = el;
                              }}
                              onClick={() => handleSectionClick(tab.id, sub.id)}
                              className={`text-left px-3 py-1.5 rounded-lg text-xs transition-all duration-200 truncate relative z-10 ${
                                isSubActive
                                  ? 'text-white font-bold bg-white/[0.06]'
                                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]'
                              }`}
                            >
                              {sub.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="pt-3 mt-3 border-t border-white/[0.08] flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-xs font-semibold"
              >
                <LogOut size={16} className="text-red-400" />
                <span>Log Out</span>
              </button>

              <div className="flex flex-col gap-1.5 px-3 pt-1 text-[11px] text-gray-500 leading-tight">
                <div className="flex items-center gap-1.5 font-medium text-gray-400">
                  <a
                    href="#privacy"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <span>•</span>
                  <a
                    href="#terms"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </div>

                <div className="relative inline-block mt-0.5">
                  <button
                    type="button"
                    onClick={() => setIsMoreMenuOpen((prev) => !prev)}
                    className="text-gray-400 hover:text-blue-400 font-medium transition-colors underline focus:outline-none"
                  >
                    More
                  </button>

                  {isMoreMenuOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-44 bg-[#161619] border border-white/[0.1] rounded-2xl p-1.5 shadow-2xl flex flex-col gap-0.5 z-50 backdrop-blur-xl animate-fadeIn">
                      <button
                        type="button"
                        onClick={() => setIsMoreMenuOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-gray-200 hover:text-white hover:bg-white/[0.08] transition-colors font-medium"
                      >
                        What's New
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMoreMenuOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-gray-200 hover:text-white hover:bg-white/[0.08] transition-colors font-medium"
                      >
                        Acknowledgements
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMoreMenuOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-gray-200 hover:text-white hover:bg-white/[0.08] transition-colors font-medium"
                      >
                        Support
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden bg-[#0c0c0e]">
          <SettingsPanelHost>
            <div
              ref={rightPanelRef}
              onScroll={handleScroll}
              className="absolute inset-0 overflow-y-auto p-6 sm:p-8 flex flex-col gap-10 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
            >
              {activeTab === 'account' && (
                <div className="text-white flex flex-col gap-10 animate-fadeIn">
                  <div id="sec-account-info" className="flex flex-col gap-6">
                    <h3 className="text-xl font-bold border-b border-white/[0.06] pb-3">
                      Account Information
                    </h3>

                    <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                      <div>
                        <h4 className="font-medium text-gray-200 text-sm">Profile photo</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Recommended size 80x80px</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Avatar src={avatarPreview} size="lg" alt="Avatar" />
                        <input
                          type="file"
                          ref={avatarInputRef}
                          onChange={handleAvatarChange}
                          className="hidden"
                          accept="image/*"
                        />
                        <button
                          type="button"
                          onClick={() => avatarInputRef.current?.click()}
                          className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition"
                        >
                          <Upload size={14} /> Choose
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 pb-6 border-b border-white/[0.06]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-200 text-sm">Profile banner</h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Upload and drag to position
                          </p>
                        </div>
                        <input
                          type="file"
                          ref={bannerInputRef}
                          onChange={handleBannerChange}
                          className="hidden"
                          accept="image/*"
                        />
                        <button
                          type="button"
                          onClick={() => bannerInputRef.current?.click()}
                          className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition"
                        >
                          <Upload size={14} /> Choose
                        </button>
                      </div>

                      <div
                        className={`w-full h-32 bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.08] relative group ${
                          bannerPreview
                            ? isDragging
                              ? 'cursor-grabbing'
                              : 'cursor-grab'
                            : 'cursor-default'
                        }`}
                        onMouseDown={handleDragStart}
                        onMouseMove={handleDragMove}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                        onTouchStart={handleDragStart}
                        onTouchMove={handleDragMove}
                        onTouchEnd={() => setIsDragging(false)}
                      >
                        {bannerPreview ? (
                          <>
                            <img
                              src={bannerPreview}
                              alt="Banner"
                              className="w-full h-full object-cover select-none pointer-events-none"
                              style={{ objectPosition: `50% ${bannerPos}%` }}
                            />
                            <div
                              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                                isDragging ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                              }`}
                            >
                              <div className="flex items-center gap-2 bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-md">
                                <MoveVertical size={16} />{' '}
                                <span className="text-xs font-medium">Pull to position</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500">
                            <ImageIcon size={28} className="opacity-50" />{' '}
                            <span className="text-xs">Banner not installed</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          maxLength={32}
                          {...register('displayName')}
                          placeholder={currentUser?.displayName || 'Your name'}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 transition"
                        />
                        {errors.displayName && (
                          <p className="text-xs text-red-500 font-medium mt-1">
                            {errors.displayName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">
                          Username
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-gray-500 select-none text-sm font-medium pointer-events-none">
                            @
                          </span>
                          <input
                            {...register('username')}
                            type="text"
                            maxLength={32}
                            placeholder={currentUser?.username || 'username'}
                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-2.5 pl-8 pr-9 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                          />
                          {isCheckingUsername && (
                            <Loader2
                              size={16}
                              className="absolute right-3 animate-spin text-gray-500"
                            />
                          )}
                        </div>

                        {errors.username && (
                          <p className="text-xs text-red-500 font-medium mt-1">
                            {errors.username.message}
                          </p>
                        )}
                        {!errors.username && isUsernameTaken && (
                          <p className="text-xs text-red-500 font-medium mt-1">
                            This username is already taken.
                          </p>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-medium text-gray-400">
                            About myself
                          </label>
                          <span className="text-[11px] text-gray-500 font-medium">
                            {(bioValue || '').length}/200
                          </span>
                        </div>
                        <textarea
                          rows={3}
                          maxLength={200}
                          {...register('bio')}
                          placeholder={currentUser?.bio || 'Tell us about yourself...'}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 transition resize-none"
                        />
                        {errors.bio && (
                          <p className="text-xs text-red-500 font-medium mt-1">
                            {errors.bio.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        disabled={isUsernameTaken || isCheckingUsername}
                        className={`bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
                          isUsernameTaken || isCheckingUsername
                            ? 'opacity-40 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        <Check size={16} /> Save changes
                      </button>
                    </div>
                  </div>

                  <div id="sec-badges" className="pt-6 border-t border-white/[0.06]">
                    <BadgeSettingsSection
                      avatarPreview={avatarPreview}
                      bannerPreview={bannerPreview}
                      bannerPos={bannerPos}
                    />
                  </div>

                  <div
                    id="sec-integrations"
                    className="pt-6 border-t border-white/[0.06] flex flex-col gap-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <LinkIcon size={20} className="text-emerald-400" />
                          Integrations
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                          Connect third-party accounts (such as GitHub) to track Pull Requests in
                          our repository and sync activity badges.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAddIntegrationModalOpen(true)}
                        className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition shrink-0 whitespace-nowrap self-start sm:self-auto"
                      >
                        <Plus size={15} /> Add Integration
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between gap-3 overflow-hidden">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-white font-bold text-sm truncate">GitHub</span>
                            {currentUser?.githubUsername ? (
                              <div className="flex flex-col min-w-0">
                                <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 truncate">
                                  <Check size={12} className="shrink-0" /> @
                                  {currentUser.githubUsername}
                                </span>
                                <span className="text-[11px] text-gray-400 truncate">
                                  {currentUser?.mergedPrsCount ?? 0} Merged PRs
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-500 text-xs truncate">Not connected</span>
                            )}
                          </div>
                        </div>

                        {currentUser?.githubUsername ? (
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={handleSyncGitHub}
                              disabled={isSyncing}
                              className="px-2.5 py-1.5 text-xs text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl transition flex items-center gap-1 whitespace-nowrap font-medium"
                              title="Sync PRs (Rate limited: 1 req / 5 min)"
                            >
                              <RotateCw size={13} className={isSyncing ? 'animate-spin' : ''} />
                              <span className="hidden sm:inline">Sync</span>
                            </button>

                            <button
                              type="button"
                              onClick={handleUnlinkGitHub}
                              className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2.5 py-1.5 rounded-xl border border-red-500/20 transition flex items-center gap-1 shrink-0 whitespace-nowrap font-medium"
                            >
                              <Unlink size={13} /> Unlink
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleConnectGithubOAuth}
                            className="text-xs text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl font-semibold transition shrink-0 whitespace-nowrap flex items-center gap-1.5"
                          >
                            <ExternalLink size={13} /> Connect
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div id="sec-reputation" className="pt-6 border-t border-white/[0.06]">
                    <h3 className="text-xl font-bold border-b border-white/[0.06] pb-3 flex items-center gap-2">
                      <Star size={20} className="text-yellow-400" />
                      Account Reputation
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mt-2">
                      Your account standing is clean. No warnings, strikes, or restrictions
                      detected.
                    </p>
                  </div>

                  <div id="sec-family" className="pt-6 border-t border-white/[0.06]">
                    <h3 className="text-xl font-bold border-b border-white/[0.06] pb-3 flex items-center gap-2">
                      <Users size={20} className="text-blue-400" />
                      Family Center
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mt-2">
                      Manage access, content controls, and family subscriptions for your account
                      members.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="text-white flex flex-col gap-10 animate-fadeIn">
                  <div id="sec-theme" className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold border-b border-white/[0.06] pb-3 flex items-center gap-2">
                      <Moon size={20} className="text-indigo-400" />
                      Color Theme
                    </h3>
                    <div className="flex items-center justify-between py-4 border-b border-white/[0.06]">
                      <div>
                        <h4 className="font-medium text-gray-200 text-sm">Interface Theme</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Select your preferred color mode
                        </p>
                      </div>
                      <select className="bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2 text-white outline-none text-xs cursor-pointer">
                        <option value="dark">Dark Theme</option>
                        <option value="light">Light Theme</option>
                      </select>
                    </div>
                  </div>

                  <div id="sec-interface" className="pt-6 border-t border-white/[0.06]">
                    <h3 className="text-xl font-bold border-b border-white/[0.06] pb-3 flex items-center gap-2">
                      <Smartphone size={20} className="text-cyan-400" />
                      Font Size & Layout
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mt-2">
                      Adjust font scaling, compact density, and message list layout options.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="text-white flex flex-col gap-10 animate-fadeIn">
                  <div id="sec-security" className="flex flex-col gap-6">
                    <h3 className="text-xl font-bold border-b border-white/[0.06] pb-3 flex items-center gap-2">
                      <Lock size={20} className="text-emerald-400" />
                      Password & Security
                    </h3>
                    <SecurityTab />
                  </div>

                  <div id="sec-autodelete" className="pt-6 border-t border-white/[0.06]">
                    <h3 className="text-xl font-bold border-b border-white/[0.06] pb-3 text-red-400">
                      Account Auto-Deletion
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mt-2">
                      Configure inactivity period settings after which your account will
                      automatically be deactivated or erased.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="text-white flex flex-col gap-10 animate-fadeIn">
                  <div id="sec-privacy-opts" className="flex flex-col gap-6">
                    <h3 className="text-xl font-bold border-b border-white/[0.06] pb-3 flex items-center gap-2">
                      <Eye size={20} className="text-blue-400" />
                      Profile Privacy
                    </h3>
                    <PrivacyTab />
                  </div>

                  <div id="sec-blacklist" className="pt-6 border-t border-white/[0.06]">
                    <h3 className="text-xl font-bold border-b border-white/[0.06] pb-3 flex items-center gap-2">
                      <UserX size={20} className="text-red-400" />
                      Blocked Users
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mt-2">
                      Manage your list of blocked accounts and message restriction preferences.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="text-white flex flex-col gap-10 animate-fadeIn">
                  <div id="sec-notifs" className="flex flex-col gap-6">
                    <h3 className="text-xl font-bold border-b border-white/[0.06] pb-3 flex items-center gap-2">
                      <Volume2 size={20} className="text-amber-400" />
                      Sound & Push Notifications
                    </h3>
                    <NotificationsTab />
                  </div>
                </div>
              )}
            </div>
          </SettingsPanelHost>
        </div>
      </form>

      {isAddIntegrationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#121215] border border-white/[0.12] rounded-3xl p-6 shadow-2xl flex flex-col gap-5 text-white animate-zoomIn">
            <button
              type="button"
              onClick={() => {
                setIsAddIntegrationModalOpen(false);
                setSelectedPlatform(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
            >
              <X size={18} />
            </button>

            {selectedPlatform === 'github' ? (
              <div className="flex flex-col items-center text-center gap-5 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                    App
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check size={14} />
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="text-xl font-bold">Authorize GitHub Account</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Link your GitHub account to automatically track merged Pull Requests in our
                    repository.
                  </p>
                </div>

                <div className="w-full text-left space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-300">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    value={githubInputUser}
                    onChange={(e) => setGithubInputUser(e.target.value)}
                    placeholder="e.g. AyateAgh"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 w-full pt-3 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleLinkGitHub}
                    disabled={!githubInputUser.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-lg flex items-center gap-1.5"
                  >
                    <Check size={15} /> Authorize & Link
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h4 className="text-xl font-bold">Add Integration</h4>
                  <p className="text-xs text-gray-400">
                    Select a platform to link your account to your social profile.
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-3 py-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('github')}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-emerald-500/50 transition group"
                  >
                    <svg
                      className="w-8 h-8 fill-current text-white group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span className="text-[11px] font-semibold text-gray-300 mt-1.5">GitHub</span>
                  </button>

                  {['Steam', 'Spotify', 'Reddit', 'Twitch', 'YouTube', 'Discord', 'Xbox'].map(
                    (plat) => (
                      <button
                        key={plat}
                        type="button"
                        onClick={() => {
                          addToast({
                            id: `plat-soon-${plat}`,
                            conversationId: '',
                            messageId: '',
                            title: `${plat} Integration`,
                            body: `${plat} integration coming soon in future updates.`,
                            avatar: null,
                            memberAvatars: [],
                            isGroup: false,
                          });
                        }}
                        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] opacity-60 hover:opacity-100 transition"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-300">
                          {plat[0]}
                        </div>
                        <span className="text-[11px] font-medium text-gray-400 mt-1.5">{plat}</span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm bg-[#121215] border border-white/[0.1] rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-white">
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-bold">Log Out</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Are you sure you want to log out?
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-lg"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
