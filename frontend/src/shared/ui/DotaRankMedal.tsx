import React, { useState } from 'react';
import { calculateDotaRank, DotaRankInfo } from '@/entities/showcase/lib/dotaRanks';

interface DotaRankMedalProps {
  mmr?: number;
  rankIcon?: string;
  rankTier?: string;
  rankInfo?: DotaRankInfo;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTooltip?: boolean;
}

export const DotaRankMedal: React.FC<DotaRankMedalProps> = ({
  mmr = 6124,
  rankIcon,
  rankTier,
  rankInfo: customRankInfo,
  size = 'md',
  className = '',
  showTooltip = true,
}) => {
  const rank = customRankInfo || calculateDotaRank(mmr);
  const initialIcon = rankIcon || rank.medalIcon;
  const [imgSrc, setImgSrc] = useState<string>(initialIcon);
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    if (rankIcon) {
      setImgSrc(rankIcon);
      setHasError(false);
    }
  }, [rankIcon]);

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const handleImageError = () => {
    if (imgSrc.includes('dotabuff/panorama')) {
      // Fallback to opendota rank asset
      setImgSrc(
        `https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${rank.tierId}.png`,
      );
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${sizeClasses} ${className}`}
      title={
        showTooltip
          ? `${rank.tierNameEn} (${rank.tierName}) • ${rank.mmr.toLocaleString()} MMR`
          : undefined
      }
    >
      {!hasError ? (
        <img
          src={imgSrc}
          alt={rank.badgeLabel}
          onError={handleImageError}
          className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full rounded-md bg-red-950/80 border border-red-500/40 flex items-center justify-center text-[10px] font-black text-amber-300">
          {rank.tierName[0]}
        </div>
      )}
    </div>
  );
};
