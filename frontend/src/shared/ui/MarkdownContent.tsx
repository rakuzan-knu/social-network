import React, { useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Link } from 'react-router-dom';
import CodeBlock from './CodeBlock';
import { MiniProfileHoverCard } from '@/entities/profile/ui/MiniProfileHoverCard';
import 'katex/dist/katex.min.css';

interface MarkdownContentProps {
  content: string;
  className?: string;
  enableMentions?: boolean;
  enableHashtags?: boolean;
}

function TextSpoilerItem({ content }: { content: string }) {
  const [isRevealed, setIsRevealed] = useState(false);

  if (isRevealed) {
    return (
      <span className="inline-block align-baseline rounded px-1.5 py-0.5 mx-0.5 bg-white/10 border border-white/15 text-white animate-fadeIn cursor-text transition-all">
        {content}
      </span>
    );
  }

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        setIsRevealed(true);
      }}
      title="Click to reveal spoiler"
      className="group/spoiler inline-block align-baseline rounded px-1.5 py-0.5 mx-0.5 bg-white/15 hover:bg-white/25 border border-white/10 cursor-pointer select-none transition-all shadow-sm"
    >
      <span className="filter blur-[5px] opacity-40 group-hover/spoiler:opacity-60 transition-opacity">
        {content}
      </span>
    </span>
  );
}

const TRAILING_PUNCT_SET = new Set(['.', ',', '!', '?', ':', ';', ')', ']']);

function splitTrailingPunct(raw: string): { clean: string; punct: string } {
  let end = raw.length - 1;
  while (end >= 0 && TRAILING_PUNCT_SET.has(raw[end])) {
    end--;
  }
  return {
    clean: raw.slice(0, end + 1),
    punct: raw.slice(end + 1),
  };
}

function renderTextWithMentionsAndSpoilers(
  text: string,
  enableMentions = true,
  enableHashtags = true,
): React.ReactNode {
  if (!text) return null;

  // 1. Process Spoilers: ||spoiler||
  if (text.includes('||')) {
    const spoilerParts = text.split(/(\|\|[\s\S]*?\|\|)/g);
    return spoilerParts.map((part, index) => {
      if (part.startsWith('||') && part.endsWith('||') && part.length >= 4) {
        const spoilerContent = part.slice(2, -2);
        return <TextSpoilerItem key={index} content={spoilerContent} />;
      }
      return (
        <React.Fragment key={index}>
          {renderTextWithMentionsAndSpoilers(part, enableMentions, enableHashtags)}
        </React.Fragment>
      );
    });
  }

  // 2. Process Mentions (@handle) and Hashtags (#tag)
  if (!enableMentions && !enableHashtags) {
    return text;
  }

  const tokenRegex = /((?:@|#)[a-zA-Z0-9_\u0400-\u04FF]+(?:\.[a-zA-Z0-9_\u0400-\u04FF]+)*)/g;
  if (!tokenRegex.test(text)) {
    return text;
  }

  const parts = text.split(tokenRegex);
  return parts.map((part, index) => {
    if (enableMentions && part.startsWith('@')) {
      const rawHandle = part.slice(1);
      const { clean: cleanHandle, punct: trailingPunct } = splitTrailingPunct(rawHandle);

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

    if (enableHashtags && part.startsWith('#')) {
      const rawTag = part.slice(1);
      const { clean: cleanTag, punct: trailingPunct } = splitTrailingPunct(rawTag);

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
  });
}

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className'],
    span: [...(defaultSchema.attributes?.span || []), 'className'],
    div: [...(defaultSchema.attributes?.div || []), 'className'],
    a: [...(defaultSchema.attributes?.a || []), 'target', 'rel', 'className', 'href'],
    th: [...(defaultSchema.attributes?.th || []), 'className', 'align'],
    td: [...(defaultSchema.attributes?.td || []), 'className', 'align'],
  },
};

function processChildren(
  children: React.ReactNode,
  enableMentions: boolean,
  enableHashtags: boolean,
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return renderTextWithMentionsAndSpoilers(child, enableMentions, enableHashtags);
    }
    return child;
  });
}

export default function MarkdownContent({
  content,
  className = '',
  enableMentions = true,
  enableHashtags = true,
}: MarkdownContentProps) {
  if (!content) return null;

  const components: Components = {
    // Custom pre renderer (unwraps to avoid double <pre> nesting)
    pre({ children }) {
      return <>{children}</>;
    },

    // Custom code renderer: distinguishes inline vs codeblock
    code({ className: codeClass, children, ...rest }) {
      const match = /language-([a-zA-Z0-9_-]+)/.exec(codeClass || '');
      const codeString = String(children || '').replace(/\n$/, '');

      // Check if block or multi-line
      const isBlock = match || codeString.includes('\n');

      if (isBlock) {
        const lang = match ? match[1] : '';
        return <CodeBlock language={lang} value={codeString} />;
      }

      // Inline code
      return (
        <code
          className="px-1.5 py-0.5 rounded-md bg-white/10 text-purple-300 font-mono text-[12px] border border-white/5 font-medium select-text break-all"
          {...rest}
        >
          {children}
        </code>
      );
    },

    // Text formatting
    strong({ children }) {
      return (
        <strong className="font-bold text-white">
          {processChildren(children, enableMentions, enableHashtags)}
        </strong>
      );
    },
    em({ children }) {
      return (
        <em className="italic text-white/90">
          {processChildren(children, enableMentions, enableHashtags)}
        </em>
      );
    },
    del({ children }) {
      return (
        <del className="line-through text-white/60">
          {processChildren(children, enableMentions, enableHashtags)}
        </del>
      );
    },

    // Blockquote
    blockquote({ children }) {
      return (
        <blockquote className="border-l-2 border-purple-500 pl-3 my-1.5 text-white/80 bg-white/[0.03] py-1 rounded-r-md italic">
          {processChildren(children, enableMentions, enableHashtags)}
        </blockquote>
      );
    },

    // Links
    a({ href, children }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors cursor-pointer"
        >
          {children}
        </a>
      );
    },

    // Headings
    h1({ children }) {
      return (
        <h1 className="text-lg font-bold text-white mt-3 mb-1.5 pb-1 border-b border-white/10">
          {processChildren(children, enableMentions, enableHashtags)}
        </h1>
      );
    },
    h2({ children }) {
      return (
        <h2 className="text-base font-bold text-white mt-2.5 mb-1 pb-0.5 border-b border-white/5">
          {processChildren(children, enableMentions, enableHashtags)}
        </h2>
      );
    },
    h3({ children }) {
      return (
        <h3 className="text-sm font-bold text-white mt-2 mb-0.5">
          {processChildren(children, enableMentions, enableHashtags)}
        </h3>
      );
    },

    // Lists
    ul({ children }) {
      return <ul className="list-disc list-inside my-1.5 space-y-0.5 pl-1">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="list-decimal list-inside my-1.5 space-y-0.5 pl-1">{children}</ol>;
    },
    li({ children }) {
      return (
        <li className="leading-relaxed text-white/90">
          {processChildren(children, enableMentions, enableHashtags)}
        </li>
      );
    },

    // Paragraph
    p({ children }) {
      return (
        <p className="leading-relaxed my-1 break-words [overflow-wrap:anywhere] first:mt-0 last:mb-0">
          {processChildren(children, enableMentions, enableHashtags)}
        </p>
      );
    },

    // Tables
    table({ children }) {
      return (
        <div className="w-full my-2 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.02] custom-scrollbar">
          <table className="min-w-full divide-y divide-white/10 text-xs text-left">
            {children}
          </table>
        </div>
      );
    },
    th({ children }) {
      return (
        <th className="px-3 py-2 bg-white/5 font-semibold text-white/90">
          {processChildren(children, enableMentions, enableHashtags)}
        </th>
      );
    },
    td({ children }) {
      return (
        <td className="px-3 py-1.5 border-t border-white/5 text-white/80">
          {processChildren(children, enableMentions, enableHashtags)}
        </td>
      );
    },

    // Horizontal Rule
    hr() {
      return <hr className="my-3 border-white/10" />;
    },
  };

  return (
    <div
      className={`markdown-content w-full min-w-0 max-w-full leading-relaxed select-text [overflow-wrap:anywhere] ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
        rehypePlugins={[[rehypeSanitize, sanitizeSchema], rehypeKatex]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export { MarkdownContent, renderTextWithMentionsAndSpoilers };
