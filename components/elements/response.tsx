'use client';

import { type ComponentProps, memo } from 'react';
import { Streamdown } from 'streamdown';
import remarkMath from 'remark-math';
import { cn } from '@/lib/utils';
import { normalizeLatexMathDelimiters } from '@/lib/utils';

type ResponseProps = ComponentProps<typeof Streamdown>;

export const Response = memo(
  ({ className, children, ...props }: ResponseProps) => {
    // Normalize math delimiters only if children is a string (streamdown also accepts arrays)
    let content = children;
    if (typeof content === 'string') {
      content = normalizeLatexMathDelimiters(content);
    }

    const extraRemarkPlugins: any[] = [
      [remarkMath, { singleDollarTextMath: true }],
    ];

    // If caller passed remarkPlugins already, append ours so we don't clobber theirs.
    // Streamdown internally prepends its own remark-math (with singleDollarTextMath disabled),
    // but our later instance (enabled) will still parse untouched inline $...$ sequences.
    const mergedProps = {
      ...props,
      remarkPlugins: [
        ...(Array.isArray((props as any).remarkPlugins)
          ? (props as any).remarkPlugins
          : []),
        ...extraRemarkPlugins,
      ],
    } as typeof props & { remarkPlugins: any[] };

    return (
      <Streamdown
        className={cn(
          'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_.katex-display]:my-4 [&_.katex-display]:overflow-x-auto [&_.katex-display]:break-words [&_.katex-display]:px-2 [&_.katex-display]:py-3 [&_.katex-display]:rounded-md [&_.katex-display]:bg-muted/40 [&_code]:whitespace-pre-wrap [&_code]:break-words [&_pre]:max-w-full [&_pre]:overflow-x-auto',
          className
        )}
        {...mergedProps}
      >
        {content}
      </Streamdown>
    );
  },
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

Response.displayName = 'Response';
