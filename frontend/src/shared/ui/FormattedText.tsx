import React from 'react';
import { Link } from 'react-router-dom';
import { MiniProfileHoverCard } from '@/entities/profile/ui/MiniProfileHoverCard';

interface FormattedTextProps {
  text: string;
  className?: string;
}

export function FormattedText({ text, className = '' }: FormattedTextProps) {
  if (!text) return null;

  // Regex to split text by @mentions and #hashtags
  // Capture groups will be preserved in the split array
  const tokenRegex = /((?:@|#)[a-zA-Z0-9_\u0400-\u04FF]+(?:\.[a-zA-Z0-9_\u0400-\u04FF]+)*)/g;
  const parts = text.split(tokenRegex);

  return (
    <span className={`whitespace-pre-line break-words ${className}`}>
      {parts.map((part, index) => {
        if (part.startsWith('@')) {
          const rawHandle = part.slice(1);
          const cleanHandle = rawHandle.replace(/[.,!?:;]+$/, '');
          const trailingPunct = rawHandle.slice(cleanHandle.length);

          if (!cleanHandle) {
            return <React.Fragment key={index}>{part}</React.Fragment>;
          }

          return (
            <React.Fragment key={index}>
              <MiniProfileHoverCard username={cleanHandle}>
                <Link
                  to={`/profile/${cleanHandle}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-sky-400 font-semibold hover:underline hover:text-sky-300 transition-colors"
                >
                  @{cleanHandle}
                </Link>
              </MiniProfileHoverCard>
              {trailingPunct}
            </React.Fragment>
          );
        }

        if (part.startsWith('#')) {
          const rawTag = part.slice(1);
          const cleanTag = rawTag.replace(/[.,!?:;]+$/, '');
          const trailingPunct = rawTag.slice(cleanTag.length);

          if (!cleanTag) {
            return <React.Fragment key={index}>{part}</React.Fragment>;
          }

          return (
            <React.Fragment key={index}>
              <Link
                to={`/search?q=${encodeURIComponent('#' + cleanTag)}`}
                onClick={(e) => e.stopPropagation()}
                className="text-sky-400 font-semibold hover:underline hover:text-sky-300 transition-colors"
              >
                #{cleanTag}
              </Link>
              {trailingPunct}
            </React.Fragment>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
