import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Sidebar from '../widgets/sidebar/ui/Sidebar';
import { UndoHideSnackbar } from '../features/posts/ui/UndoHideSnackbar';
import { UndoClearHistorySnackbar } from '../features/chat/ui/UndoClearHistorySnackbar';
import DeviceLockGate from '../features/profile/ui/security/DeviceLockGate';
import MessageToastViewport from '../features/chat/ui/MessageToastViewport';
import FloatingVideoNotePiP from '../features/chat/ui/FloatingVideoNotePiP';
import ReactionBurstCanvas from '../features/chat/ui/ReactionBurstCanvas';

import { useUIStore } from '../shared/model/useUIStore';
import { useAuthStore } from '../shared/model/useAuthStore';

const EditProfileModal = lazy(() => import('../features/profile/ui/EditProfileModal'));
const ShareModal = lazy(() =>
  import('../features/posts/ui/ShareModal').then((m) => ({ default: m.ShareModal })),
);
const CommentModal = lazy(() =>
  import('../features/comment/ui/CommentModal').then((m) => ({ default: m.CommentModal })),
);
const StoryViewerModal = lazy(() =>
  import('../features/stories/ui/StoryViewerModal').then((m) => ({ default: m.StoryViewerModal })),
);
const StoryEditorModal = lazy(() =>
  import('../features/stories/ui/StoryEditorModal').then((m) => ({ default: m.StoryEditorModal })),
);

const FeedPage = lazy(() => import('../pages/Feed/Feed'));
const ProfilePage = lazy(() => import('../pages/Profile/Profile'));
const MessengerPage = lazy(() => import('../pages/Chat/Messenger'));
const StandaloneChatPage = lazy(() => import('../pages/Chat/StandaloneChatPage'));
const SearchPage = lazy(() => import('../pages/Search/SearchPage'));
const NotificationsPage = lazy(() =>
  import('../pages/Notifications/NotificationsPage').then((m) => ({
    default: m.NotificationsPage,
  })),
);
const LoginPage = lazy(() =>
  import('../pages/Login/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('../pages/Register/RegisterPage').then((m) => ({ default: m.RegisterPage })),
);
const ForgotPasswordPage = lazy(() =>
  import('../pages/Forgot-Password/ForgotPasswordPage').then((m) => ({
    default: m.ForgotPasswordPage,
  })),
);
const PrivacyPage = lazy(() => import('../pages/Privacy/PrivacyPage'));
const TermsPage = lazy(() => import('../pages/Terms/TermsPage'));
const ApplicantCandidatePrivacyPage = lazy(
  () => import('../pages/Terms/ApplicantCandidatePrivacyPage'),
);
const CookiePolicyPage = lazy(() => import('../pages/Terms/CookiePolicyPage'));
const RegionalPrivacyPage = lazy(() => import('../pages/Terms/RegionalPrivacyPage'));
const RetentionPolicyPage = lazy(() => import('../pages/Terms/RetentionPolicyPage'));
const DataPrivacyControlsPage = lazy(() => import('../pages/Terms/DataPrivacyControlsPage'));
const YourDataPackagePage = lazy(() => import('../pages/Terms/YourDataPackagePage'));
const CopyrightPolicyPage = lazy(() => import('../pages/Terms/CopyrightPolicyPage'));
const PaidServicesPage = lazy(() => import('../pages/Terms/PaidServicesPage'));
const LawEnforcementPage = lazy(() => import('../pages/Safety/LawEnforcementPage'));
const DeveloperTermsPage = lazy(() => import('../pages/Terms/DeveloperTermsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage'));
const GuidelinesPage = lazy(() => import('../pages/Guidelines/GuidelinesPage'));
const AcknowledgementsPage = lazy(() => import('../pages/Acknowledgements/AcknowledgementsPage'));
const LicensesPage = lazy(() => import('../pages/Licenses/LicensesPage'));
const CompanyInformationPage = lazy(() => import('../pages/Company/CompanyInformationPage'));
const CompanyAboutPage = lazy(() => import('../pages/Company/CompanyAboutPage'));
const CareersPage = lazy(() => import('../pages/Company/CareersPage'));
const BrandingPage = lazy(() => import('../pages/Brand/BrandingPage'));
const DownloadPage = lazy(() => import('../pages/Download/DownloadPage'));
const NewsroomPage = lazy(() => import('../pages/Newsroom/NewsroomPage'));
const BlogPage = lazy(() => import('../pages/Blog/BlogPage'));
const CategoryPage = lazy(() => import('../pages/Blog/CategoryPage'));
const FamilyCenterPage = lazy(() =>
  import('../pages/Safety/FamilyCenterPage').then((m) => ({ default: m.FamilyCenterPage })),
);
const SafetyCenterPage = lazy(() =>
  import('../pages/Safety/SafetyCenterPage').then((m) => ({ default: m.SafetyCenterPage })),
);
const SafetyLibraryPage = lazy(() =>
  import('../pages/Safety/SafetyLibraryPage').then((m) => ({ default: m.SafetyLibraryPage })),
);
const PrivacyHubPage = lazy(() =>
  import('../pages/Safety/PrivacyHubPage').then((m) => ({ default: m.PrivacyHubPage })),
);
const TransparencyHubPage = lazy(() =>
  import('../pages/Safety/TransparencyHubPage').then((m) => ({ default: m.TransparencyHubPage })),
);
const SafetyNewsHubPage = lazy(() =>
  import('../pages/Safety/SafetyNewsHubPage').then((m) => ({ default: m.SafetyNewsHubPage })),
);
const PolicyHubPage = lazy(() =>
  import('../pages/Safety/PolicyHubPage').then((m) => ({ default: m.PolicyHubPage })),
);
const TeenCharterPage = lazy(() =>
  import('../pages/Safety/TeenCharterPage').then((m) => ({ default: m.TeenCharterPage })),
);
const WellbeingHubPage = lazy(() =>
  import('../pages/Safety/WellbeingHubPage').then((m) => ({ default: m.WellbeingHubPage })),
);
const CreatorsPage = lazy(() =>
  import('../pages/Creators/CreatorsPage').then((m) => ({ default: m.CreatorsPage })),
);

import { OnlineFriendsSidebar } from '../widgets/sidebar/ui/OnlineFriendsSidebar';
import { usePresenceSync } from '../features/chat/model/usePresence';
import { useDynamicTabBadge } from '../shared/lib/useDynamicTabBadge';
import { ScrollToTop } from '../shared/lib/ScrollToTop';
import { useNotificationRealtime } from '@/entities/notification';
import { useStoriesRealtime } from '../features/stories/model/useStoriesRealtime';

function PageFallback() {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
    </div>
  );
}

function CenteredPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-center py-8">
      <div className="w-full max-w-2xl px-4">{children}</div>
    </div>
  );
}

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full justify-center py-8 px-4">{children}</div>;
}

function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-center gap-8 py-8 px-4">
      <div className="w-full max-w-2xl">{children}</div>
      <OnlineFriendsSidebar />
    </div>
  );
}

export default function App() {
  const isSidebarExpanded = useUIStore((state) => state.isSidebarExpanded);
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  usePresenceSync();
  useDynamicTabBadge();
  useNotificationRealtime();
  useStoriesRealtime();

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-[#070709] text-white">
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route
              path="/terms/applicant-candidate-privacy-policy"
              element={<ApplicantCandidatePrivacyPage />}
            />
            <Route path="/terms/applicant-candidate" element={<ApplicantCandidatePrivacyPage />} />
            <Route path="/terms/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/terms/cookies" element={<CookiePolicyPage />} />
            <Route path="/terms/local-laws" element={<RegionalPrivacyPage />} />
            <Route path="/terms/regional-privacy" element={<RegionalPrivacyPage />} />
            <Route path="/privacy/regional" element={<RegionalPrivacyPage />} />
            <Route path="/terms/retention-policy" element={<RetentionPolicyPage />} />
            <Route path="/terms/retention" element={<RetentionPolicyPage />} />
            <Route path="/privacy/retention" element={<RetentionPolicyPage />} />
            <Route path="/terms/data-privacy-controls" element={<DataPrivacyControlsPage />} />
            <Route path="/terms/privacy-controls" element={<DataPrivacyControlsPage />} />
            <Route path="/privacy/controls" element={<DataPrivacyControlsPage />} />
            <Route path="/terms/your-eternal-data-package" element={<YourDataPackagePage />} />
            <Route path="/terms/data-package" element={<YourDataPackagePage />} />
            <Route path="/privacy/data-package" element={<YourDataPackagePage />} />
            <Route path="/copyright" element={<CopyrightPolicyPage />} />
            <Route path="/dmca" element={<CopyrightPolicyPage />} />
            <Route path="/terms/copyright" element={<CopyrightPolicyPage />} />
            <Route path="/terms/dmca" element={<CopyrightPolicyPage />} />
            <Route path="/terms/paid-services" element={<PaidServicesPage />} />
            <Route path="/terms/paid" element={<PaidServicesPage />} />
            <Route path="/terms/refunds" element={<PaidServicesPage />} />
            <Route path="/terms/refund-policy" element={<PaidServicesPage />} />
            <Route path="/safety-law-enforcement" element={<LawEnforcementPage />} />
            <Route path="/safety/law-enforcement" element={<LawEnforcementPage />} />
            <Route path="/safety/law" element={<LawEnforcementPage />} />
            <Route path="/law-enforcement" element={<LawEnforcementPage />} />
            <Route path="/terms/developer" element={<DeveloperTermsPage />} />
            <Route path="/terms/developers" element={<DeveloperTermsPage />} />
            <Route path="/developers" element={<DeveloperTermsPage />} />
            <Route path="/developer" element={<DeveloperTermsPage />} />
            <Route path="/guidelines" element={<GuidelinesPage />} />
            <Route path="/acknowledgements" element={<AcknowledgementsPage />} />
            <Route path="/licenses" element={<LicensesPage />} />
            <Route path="/licences" element={<LicensesPage />} />
            <Route path="/company-information" element={<CompanyInformationPage />} />
            <Route path="/impressum" element={<CompanyInformationPage />} />
            <Route path="/company" element={<CompanyAboutPage />} />
            <Route path="/about" element={<CompanyAboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/jobs" element={<CareersPage />} />
            <Route path="/branding" element={<BrandingPage />} />
            <Route path="/brand" element={<BrandingPage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/newsroom" element={<NewsroomPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/category/community" element={<CategoryPage />} />
            <Route path="/safety-family-center" element={<FamilyCenterPage />} />
            <Route path="/safety/family-center" element={<FamilyCenterPage />} />
            <Route path="/safety-library" element={<SafetyLibraryPage />} />
            <Route path="/safety/library" element={<SafetyLibraryPage />} />
            <Route path="/safety-privacy" element={<PrivacyHubPage />} />
            <Route path="/safety/privacy" element={<PrivacyHubPage />} />
            <Route path="/safety-transparency" element={<TransparencyHubPage />} />
            <Route path="/safety/transparency" element={<TransparencyHubPage />} />
            <Route path="/transparency" element={<TransparencyHubPage />} />
            <Route path="/safety-news" element={<SafetyNewsHubPage />} />
            <Route path="/safety/news" element={<SafetyNewsHubPage />} />
            <Route path="/safety-policies" element={<PolicyHubPage />} />
            <Route path="/safety/policies" element={<PolicyHubPage />} />
            <Route path="/policies" element={<PolicyHubPage />} />
            <Route path="/safety-teen-charter" element={<TeenCharterPage />} />
            <Route path="/safety/teen-charter" element={<TeenCharterPage />} />
            <Route path="/teen-charter" element={<TeenCharterPage />} />
            <Route path="/safety-wellbeing" element={<WellbeingHubPage />} />
            <Route path="/safety/wellbeing" element={<WellbeingHubPage />} />
            <Route path="/wellbeing" element={<WellbeingHubPage />} />
            <Route path="/safety" element={<SafetyCenterPage />} />
            <Route path="/creators" element={<CreatorsPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </div>
    );
  }

  const isStandaloneRoute =
    location.pathname.startsWith('/messages') ||
    location.pathname.startsWith('/messenger') ||
    location.pathname.startsWith('/privacy') ||
    location.pathname.startsWith('/terms') ||
    location.pathname.startsWith('/copyright') ||
    location.pathname.startsWith('/dmca') ||
    location.pathname.startsWith('/developers') ||
    location.pathname.startsWith('/developer') ||
    location.pathname.startsWith('/guidelines') ||
    location.pathname.startsWith('/acknowledgements') ||
    location.pathname.startsWith('/licenses') ||
    location.pathname.startsWith('/licences') ||
    location.pathname.startsWith('/company-information') ||
    location.pathname.startsWith('/impressum') ||
    location.pathname.startsWith('/company') ||
    location.pathname.startsWith('/about') ||
    location.pathname.startsWith('/careers') ||
    location.pathname.startsWith('/jobs') ||
    location.pathname.startsWith('/branding') ||
    location.pathname.startsWith('/brand') ||
    location.pathname.startsWith('/download') ||
    location.pathname.startsWith('/newsroom') ||
    location.pathname.startsWith('/blog') ||
    location.pathname.startsWith('/category') ||
    location.pathname.startsWith('/safety-family-center') ||
    location.pathname.startsWith('/safety-library') ||
    location.pathname.startsWith('/safety-privacy') ||
    location.pathname.startsWith('/safety-law') ||
    location.pathname.startsWith('/safety-law-enforcement') ||
    location.pathname.startsWith('/law-enforcement') ||
    location.pathname.startsWith('/policies') ||
    location.pathname.startsWith('/teen-charter') ||
    location.pathname.startsWith('/wellbeing') ||
    location.pathname.startsWith('/creators') ||
    location.pathname.startsWith('/404') ||
    location.pathname.startsWith('/safety');

  const isMessengerRoute =
    location.pathname.startsWith('/messages') ||
    location.pathname.startsWith('/messenger') ||
    location.pathname.startsWith('/chat/standalone');

  return (
    <DeviceLockGate>
      <div className="relative min-h-screen bg-[#070709] text-white">
        <ScrollToTop />
        {!isStandaloneRoute && <Sidebar />}
        <Suspense fallback={null}>
          <EditProfileModal />
          <ShareModal />
          <CommentModal />
          <StoryViewerModal />
          <StoryEditorModal />
        </Suspense>
        <UndoHideSnackbar />
        <UndoClearHistorySnackbar />
        <FloatingVideoNotePiP />
        <ReactionBurstCanvas />
        {!isMessengerRoute && <MessageToastViewport />}

        <main
          className={
            isStandaloneRoute
              ? 'min-h-screen flex-1'
              : `flex min-h-screen flex-1 justify-center py-8 transition-all duration-300 ${
                  isSidebarExpanded ? 'pl-[232px]' : 'pl-24'
                }`
          }
        >
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route
                path="/terms/applicant-candidate-privacy-policy"
                element={<ApplicantCandidatePrivacyPage />}
              />
              <Route
                path="/terms/applicant-candidate"
                element={<ApplicantCandidatePrivacyPage />}
              />
              <Route path="/terms/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/terms/cookies" element={<CookiePolicyPage />} />
              <Route path="/terms/local-laws" element={<RegionalPrivacyPage />} />
              <Route path="/terms/regional-privacy" element={<RegionalPrivacyPage />} />
              <Route path="/privacy/regional" element={<RegionalPrivacyPage />} />
              <Route path="/terms/retention-policy" element={<RetentionPolicyPage />} />
              <Route path="/terms/retention" element={<RetentionPolicyPage />} />
              <Route path="/privacy/retention" element={<RetentionPolicyPage />} />
              <Route path="/terms/data-privacy-controls" element={<DataPrivacyControlsPage />} />
              <Route path="/terms/privacy-controls" element={<DataPrivacyControlsPage />} />
              <Route path="/privacy/controls" element={<DataPrivacyControlsPage />} />
              <Route path="/terms/your-eternal-data-package" element={<YourDataPackagePage />} />
              <Route path="/terms/data-package" element={<YourDataPackagePage />} />
              <Route path="/privacy/data-package" element={<YourDataPackagePage />} />
              <Route path="/copyright" element={<CopyrightPolicyPage />} />
              <Route path="/dmca" element={<CopyrightPolicyPage />} />
              <Route path="/terms/copyright" element={<CopyrightPolicyPage />} />
              <Route path="/terms/dmca" element={<CopyrightPolicyPage />} />
              <Route path="/terms/paid-services" element={<PaidServicesPage />} />
              <Route path="/terms/paid" element={<PaidServicesPage />} />
              <Route path="/terms/refunds" element={<PaidServicesPage />} />
              <Route path="/terms/refund-policy" element={<PaidServicesPage />} />
              <Route path="/safety-law-enforcement" element={<LawEnforcementPage />} />
              <Route path="/safety/law-enforcement" element={<LawEnforcementPage />} />
              <Route path="/safety/law" element={<LawEnforcementPage />} />
              <Route path="/law-enforcement" element={<LawEnforcementPage />} />
              <Route path="/terms/developer" element={<DeveloperTermsPage />} />
              <Route path="/terms/developers" element={<DeveloperTermsPage />} />
              <Route path="/developers" element={<DeveloperTermsPage />} />
              <Route path="/developer" element={<DeveloperTermsPage />} />
              <Route path="/guidelines" element={<GuidelinesPage />} />
              <Route path="/acknowledgements" element={<AcknowledgementsPage />} />
              <Route path="/licenses" element={<LicensesPage />} />
              <Route path="/licences" element={<LicensesPage />} />
              <Route path="/company-information" element={<CompanyInformationPage />} />
              <Route path="/impressum" element={<CompanyInformationPage />} />
              <Route path="/company" element={<CompanyAboutPage />} />
              <Route path="/about" element={<CompanyAboutPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/jobs" element={<CareersPage />} />
              <Route path="/branding" element={<BrandingPage />} />
              <Route path="/brand" element={<BrandingPage />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/newsroom" element={<NewsroomPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/category/community" element={<CategoryPage />} />
              <Route path="/safety-family-center" element={<FamilyCenterPage />} />
              <Route path="/safety/family-center" element={<FamilyCenterPage />} />
              <Route path="/safety-library" element={<SafetyLibraryPage />} />
              <Route path="/safety/library" element={<SafetyLibraryPage />} />
              <Route path="/safety-privacy" element={<PrivacyHubPage />} />
              <Route path="/safety/privacy" element={<PrivacyHubPage />} />
              <Route path="/safety-transparency" element={<TransparencyHubPage />} />
              <Route path="/safety/transparency" element={<TransparencyHubPage />} />
              <Route path="/transparency" element={<TransparencyHubPage />} />
              <Route path="/safety-news" element={<SafetyNewsHubPage />} />
              <Route path="/safety/news" element={<SafetyNewsHubPage />} />
              <Route path="/safety-policies" element={<PolicyHubPage />} />
              <Route path="/safety/policies" element={<PolicyHubPage />} />
              <Route path="/policies" element={<PolicyHubPage />} />
              <Route path="/safety-teen-charter" element={<TeenCharterPage />} />
              <Route path="/safety/teen-charter" element={<TeenCharterPage />} />
              <Route path="/teen-charter" element={<TeenCharterPage />} />
              <Route path="/safety-wellbeing" element={<WellbeingHubPage />} />
              <Route path="/safety/wellbeing" element={<WellbeingHubPage />} />
              <Route path="/wellbeing" element={<WellbeingHubPage />} />
              <Route path="/safety" element={<SafetyCenterPage />} />
              <Route path="/creators" element={<CreatorsPage />} />
              <Route
                path="/"
                element={
                  <FeedLayout>
                    <FeedPage />
                  </FeedLayout>
                }
              />
              <Route
                path="/feed"
                element={
                  <FeedLayout>
                    <FeedPage />
                  </FeedLayout>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProfileLayout>
                    <ProfilePage />
                  </ProfileLayout>
                }
              />
              <Route
                path="/profile/:username"
                element={
                  <ProfileLayout>
                    <ProfilePage />
                  </ProfileLayout>
                }
              />

              <Route
                path="/search"
                element={
                  <CenteredPage>
                    <SearchPage />
                  </CenteredPage>
                }
              />

              <Route
                path="/explore"
                element={
                  <CenteredPage>
                    <SearchPage />
                  </CenteredPage>
                }
              />

              <Route
                path="/reels"
                element={
                  <CenteredPage>
                    <div className="animate-fadeIn py-20 text-center text-gray-500">
                      Reels page under development...
                    </div>
                  </CenteredPage>
                }
              />

              <Route path="/messages/standalone/:conversationId" element={<StandaloneChatPage />} />
              <Route path="/chat/standalone/:conversationId" element={<StandaloneChatPage />} />
              <Route path="/messages" element={<MessengerPage />} />
              <Route path="/messages/:conversationId" element={<MessengerPage />} />

              <Route
                path="/notifications"
                element={
                  <CenteredPage>
                    <NotificationsPage />
                  </CenteredPage>
                }
              />
              <Route
                path="/create"
                element={
                  <CenteredPage>
                    <FeedPage />
                  </CenteredPage>
                }
              />

              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
              <Route path="/forgot-password" element={<Navigate to="/" replace />} />

              <Route
                path="/:username"
                element={
                  <ProfileLayout>
                    <ProfilePage />
                  </ProfileLayout>
                }
              />

              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </DeviceLockGate>
  );
}
