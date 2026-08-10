import { Clock, Forward, Phone, Mic, MessageSquare, Cake, Users, Lock, EyeOff } from 'lucide-react';
import Avatar from '@/shared/ui/Avatar';
import { useCurrentUser } from '@/entities/profile/model/useCurrentUser';
import type { PrivacyDimension, Visibility } from '../../model/privacyTypes';

interface PreviewCardProps {
  dimension: PrivacyDimension;
  value: Visibility;
}

const ICONS: Partial<Record<PrivacyDimension, React.ElementType>> = {
  LAST_SEEN: Clock,
  FORWARD_LINK: Forward,
  CALLS: Phone,
  VOICE_MESSAGES: Mic,
  MESSAGES: MessageSquare,
  BIRTHDAY: Cake,
  GROUP_INVITES: Users,
};

function strangerLabel(dimension: PrivacyDimension, value: Visibility): string {
  const shownFor =
    value === 'EVERYBODY' ? 'all' : value === 'CONTACTS' ? 'your subscribers' : 'nobody';
  switch (dimension) {
    case 'LAST_SEEN':
      return value === 'EVERYBODY'
        ? 'All see your exact last activity time.'
        : value === 'CONTACTS'
          ? 'Your subscribers see the exact time, others see only «recently».'
          : 'Others see only «recently».';
    case 'FORWARD_LINK':
      return value === 'NOBODY'
        ? 'Forwarded messages show «Anonymous», without a link to the profile.'
        : `Forwarded messages link to your profile for ${shownFor}.`;
    case 'CALLS':
      return `You can be called by: ${shownFor}.`;
    case 'VOICE_MESSAGES':
      return `Send voice messages: ${shownFor}.`;
    case 'MESSAGES':
      return `Send direct messages: ${shownFor}.`;
    case 'BIRTHDAY':
      return `Birthday visibility: ${shownFor}.`;
    case 'GROUP_INVITES':
      return `Add you to groups: ${shownFor}.`;
    case 'AVATAR':
      return `Profile picture visible to: ${shownFor}.`;
    case 'BANNER':
      return `Profile banner visible to: ${shownFor}.`;
    case 'BIO':
      return `Profile bio visible to: ${shownFor}.`;
    default:
      return '';
  }
}

const PROFILE_FIELD_DIMENSIONS: PrivacyDimension[] = ['AVATAR', 'BANNER', 'BIO'];

export default function PreviewCard({ dimension, value }: PreviewCardProps) {
  const { data: currentUser } = useCurrentUser();
  const hidden = value === 'NOBODY';
  const isProfileField = PROFILE_FIELD_DIMENSIONS.includes(dimension);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-2xl overflow-hidden">
      <div className="px-4 pt-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500 border-b border-white/5">
        Preview
      </div>
      <div key={`${dimension}:${value}`} className="p-5 animate-fadeIn">
        {isProfileField ? (
          <ProfileFieldPreview
            dimension={dimension}
            hidden={hidden}
            value={value}
            currentUser={currentUser}
          />
        ) : (
          <GenericPreview dimension={dimension} value={value} hidden={hidden} />
        )}
      </div>
    </div>
  );
}

function GenericPreview({
  dimension,
  value,
  hidden,
}: {
  dimension: PrivacyDimension;
  value: Visibility;
  hidden: boolean;
}) {
  const Icon = ICONS[dimension] ?? Clock;
  return (
    <div className="flex items-start gap-3">
      <span
        className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-2xl border transition-colors ${
          hidden
            ? 'bg-white/5 border-white/10 text-gray-500'
            : 'bg-white/10 border-white/15 text-white'
        }`}
      >
        {hidden ? <Lock size={17} /> : <Icon size={17} />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">
          How {value === 'CONTACTS' ? 'subscribers' : 'others'} see it
        </p>
        <p className="mt-1 text-xs text-gray-400 leading-relaxed">
          {strangerLabel(dimension, value)}
        </p>
      </div>
    </div>
  );
}

function ProfileFieldPreview({
  dimension,
  hidden,
  value,
  currentUser,
}: {
  dimension: PrivacyDimension;
  hidden: boolean;
  value: Visibility;
  currentUser:
    | {
        displayName?: string;
        username?: string;
        avatar?: string | null;
        banner?: string | null;
        bio?: string | null;
      }
    | undefined;
}) {
  const who = value === 'CONTACTS' ? 'subscribers' : 'others';

  return (
    <div>
      <p className="text-sm font-medium text-white mb-3">How {who} see it</p>
      <div className="rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
        {dimension === 'BANNER' && (
          <div className="h-20 w-full bg-[#111]">
            {!hidden && currentUser?.banner ? (
              <img src={currentUser.banner} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                {hidden ? <Lock size={18} /> : <EyeOff size={18} />}
              </div>
            )}
          </div>
        )}

        <div className="p-4 flex items-center gap-3">
          {dimension === 'AVATAR' && hidden ? (
            <span className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-500">
              <Lock size={16} />
            </span>
          ) : (
            <Avatar src={currentUser?.avatar} size="md" alt={currentUser?.displayName} />
          )}

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">
              {currentUser?.displayName || currentUser?.username}
            </p>
            {dimension === 'BIO' ? (
              hidden ? (
                <p className="text-xs text-gray-500 italic mt-0.5">Hidden profile description</p>
              ) : (
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {currentUser?.bio || 'No profile description available.'}
                </p>
              )
            ) : (
              <p className="text-xs text-gray-500">@{currentUser?.username}</p>
            )}
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-500 leading-relaxed">
        {strangerLabel(dimension, value)}
      </p>
    </div>
  );
}
