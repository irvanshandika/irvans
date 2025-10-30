/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import { cn } from '@/src/lib/utils';

interface HtmlRendererProps {
  html: string;
  className?: string;
}

export function HtmlRenderer({ html, className }: HtmlRendererProps) {
  if (!html) return null;

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === 'tag') {
        const { name, attribs, children } = domNode;
        
        // Handle strong/bold tags
        if (name === 'strong' || name === 'b') {
          return (
            <strong className="font-bold">
              {domToReact(children as any, options)}
            </strong>
          );
        }
        
        // Handle emphasis/italic tags
        if (name === 'em' || name === 'i') {
          return (
            <em className="italic">
              {domToReact(children as any, options)}
            </em>
          );
        }
        
        // Handle underline tags
        if (name === 'u') {
          return (
            <u className="underline">
              {domToReact(children as any, options)}
            </u>
          );
        }
        
        // Handle paragraph tags
        if (name === 'p') {
          return (
            <div className="mb-2">
              {domToReact(children as any, options)}
            </div>
          );
        }
        
        // Handle heading tags
        if (name === 'h1') {
          return (
            <h1 className="text-2xl font-bold mb-2">
              {domToReact(children as any, options)}
            </h1>
          );
        }
        
        if (name === 'h2') {
          return (
            <h2 className="text-xl font-bold mb-2">
              {domToReact(children as any, options)}
            </h2>
          );
        }
        
        // Handle code blocks
        if (name === 'pre') {
          return (
            <pre className="bg-muted p-2 rounded-md my-2 overflow-x-auto">
              {domToReact(children as any, options)}
            </pre>
          );
        }
        
        if (name === 'code') {
          return (
            <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
              {domToReact(children as any, options)}
            </code>
          );
        }
        
        // Handle lists
        if (name === 'ul') {
          return (
            <ul className="list-disc pl-5 mb-2">
              {domToReact(children as any, options)}
            </ul>
          );
        }
        
        if (name === 'ol') {
          return (
            <ol className="list-decimal pl-5 mb-2">
              {domToReact(children as any, options)}
            </ol>
          );
        }
        
        if (name === 'li') {
          return (
            <li className="mb-1">
              {domToReact(children as any, options)}
            </li>
          );
        }
      }
    }
  };

  return (
    <div className={cn("prose dark:prose-invert max-w-none", className)}>
      {parse(html, options)}
    </div>
  );
}