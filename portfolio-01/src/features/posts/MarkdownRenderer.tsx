import styled from '@emotion/styled';
import { type ReactNode } from 'react';
import { theme } from '../../styles/theme';

type MarkdownBlock =
  | { type: 'heading'; level: number; content: string }
  | { type: 'paragraph'; content: string }
  | { type: 'blockquote'; content: string }
  | { type: 'unordered-list'; items: string[] }
  | { type: 'ordered-list'; items: string[] }
  | { type: 'code'; language: string; content: string }
  | { type: 'image'; alt: string; src: string }
  | { type: 'divider' };

const Content = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
  color: ${theme.colors.textLight};

  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme.colors.light};
  }

  p {
    line-height: 1.85;
    opacity: 0.96;
  }

  ul,
  ol {
    display: grid;
    gap: ${theme.spacing.sm};
    padding-left: 1.25rem;
  }

  li {
    line-height: 1.75;
  }

  blockquote {
    border-left: 4px solid ${theme.colors.accent};
    padding-left: ${theme.spacing.md};
    color: ${theme.colors.light};
    opacity: 0.95;
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.18em;
  }

  code {
    font-family: 'Fira Code', 'SFMono-Regular', Consolas, monospace;
    font-size: 0.95em;
  }

  pre {
    overflow-x: auto;
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid ${theme.colors.glass.border};
    border-radius: 16px;
    padding: ${theme.spacing.lg};
  }

  pre code {
    display: block;
    white-space: pre;
    color: ${theme.colors.light};
  }

  hr {
    border: none;
    border-top: 1px solid ${theme.colors.glass.border};
  }

  img {
    width: 100%;
    border-radius: 16px;
    border: 1px solid ${theme.colors.glass.border};
  }

  .inline-code {
    background: rgba(56, 189, 248, 0.12);
    color: ${theme.colors.light};
    border-radius: 8px;
    padding: 0.15rem 0.4rem;
  }
`;

const CodeHeader = styled.div`
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.sm};
`;

interface MarkdownRendererProps {
  markdown: string;
}

export const MarkdownRenderer = ({ markdown }: MarkdownRendererProps) => {
  const blocks = parseMarkdown(markdown);

  return (
    <Content>
      {blocks.map((block, index) => renderBlock(block, index))}
    </Content>
  );
};

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    const codeFence = trimmed.match(/^```(\w+)?$/);

    if (codeFence) {
      const language = codeFence[1] ?? '';
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && lines[index].trim() !== '```') {
        codeLines.push(lines[index]);
        index += 1;
      }

      blocks.push({
        type: 'code',
        language,
        content: codeLines.join('\n'),
      });

      index += 1;
      continue;
    }

    if (/^---+$/.test(trimmed) || /^\*\*\*+$/.test(trimmed)) {
      blocks.push({ type: 'divider' });
      index += 1;
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);

    if (heading) {
      blocks.push({
        type: 'heading',
        level: heading[1].length,
        content: heading[2].trim(),
      });
      index += 1;
      continue;
    }

    const image = trimmed.match(/^!\[(.*)]\((.+)\)$/);

    if (image) {
      blocks.push({
        type: 'image',
        alt: image[1].trim(),
        src: image[2].trim(),
      });
      index += 1;
      continue;
    }

    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quoteLines.push(lines[index].replace(/^\s*>\s?/, '').trim());
        index += 1;
      }

      blocks.push({
        type: 'blockquote',
        content: quoteLines.join(' '),
      });
      continue;
    }

    if (/^[-*+]\s+/.test(trimmed)) {
      const items: string[] = [];

      while (index < lines.length && /^[-*+]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*+]\s+/, ''));
        index += 1;
      }

      blocks.push({
        type: 'unordered-list',
        items,
      });
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ''));
        index += 1;
      }

      blocks.push({
        type: 'ordered-list',
        items,
      });
      continue;
    }

    const paragraphLines: string[] = [];

    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,6})\s+/.test(lines[index].trim()) &&
      !/^```/.test(lines[index].trim()) &&
      !/^!\[.*]\(.+\)$/.test(lines[index].trim()) &&
      !/^>\s?/.test(lines[index].trim()) &&
      !/^[-*+]\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !/^---+$/.test(lines[index].trim()) &&
      !/^\*\*\*+$/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({
      type: 'paragraph',
      content: paragraphLines.join(' '),
    });
  }

  return blocks;
}

function renderBlock(block: MarkdownBlock, index: number) {
  const key = `${block.type}-${index}`;

  switch (block.type) {
    case 'heading': {
      if (block.level === 1) {
        return <h1 key={key}>{renderInline(block.content, key)}</h1>;
      }

      if (block.level === 2) {
        return <h2 key={key}>{renderInline(block.content, key)}</h2>;
      }

      if (block.level === 3) {
        return <h3 key={key}>{renderInline(block.content, key)}</h3>;
      }

      if (block.level === 4) {
        return <h4 key={key}>{renderInline(block.content, key)}</h4>;
      }

      if (block.level === 5) {
        return <h5 key={key}>{renderInline(block.content, key)}</h5>;
      }

      return <h6 key={key}>{renderInline(block.content, key)}</h6>;
    }
    case 'paragraph':
      return <p key={key}>{renderInline(block.content, key)}</p>;
    case 'blockquote':
      return <blockquote key={key}>{renderInline(block.content, key)}</blockquote>;
    case 'unordered-list':
      return (
        <ul key={key}>
          {block.items.map((item, itemIndex) => (
            <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>
          ))}
        </ul>
      );
    case 'ordered-list':
      return (
        <ol key={key}>
          {block.items.map((item, itemIndex) => (
            <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>
          ))}
        </ol>
      );
    case 'code':
      return (
        <div key={key}>
          {block.language ? <CodeHeader>{block.language}</CodeHeader> : null}
          <pre>
            <code>{block.content}</code>
          </pre>
        </div>
      );
    case 'image':
      return <img key={key} src={block.src} alt={block.alt} />;
    case 'divider':
      return <hr key={key} />;
    default:
      return null;
  }
}

function renderInline(content: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let remaining = content;
  let index = 0;

  while (remaining) {
    const token = findNextToken(remaining);

    if (!token) {
      nodes.push(remaining);
      break;
    }

    if (token.index > 0) {
      nodes.push(remaining.slice(0, token.index));
    }

    const key = `${keyPrefix}-${index}`;

    switch (token.type) {
      case 'link':
        nodes.push(
          <a key={key} href={token.match[2]} target="_blank" rel="noopener noreferrer">
            {renderInline(token.match[1], key)}
          </a>,
        );
        break;
      case 'code':
        nodes.push(
          <code key={key} className="inline-code">
            {token.match[1]}
          </code>,
        );
        break;
      case 'strong':
        nodes.push(<strong key={key}>{renderInline(token.match[1], key)}</strong>);
        break;
      case 'emphasis':
        nodes.push(<em key={key}>{renderInline(token.match[1], key)}</em>);
        break;
      case 'strike':
        nodes.push(<s key={key}>{renderInline(token.match[1], key)}</s>);
        break;
      default:
        break;
    }

    remaining = remaining.slice(token.index + token.match[0].length);
    index += 1;
  }

  return nodes;
}

function findNextToken(content: string) {
  const matchers = [
    { type: 'link', regex: /\[([^\]]+)]\(([^)]+)\)/ },
    { type: 'code', regex: /`([^`]+)`/ },
    { type: 'strong', regex: /\*\*([^*]+)\*\*/ },
    { type: 'strike', regex: /~~([^~]+)~~/ },
    { type: 'emphasis', regex: /\*([^*]+)\*/ },
  ] as const;

  return matchers
    .map((matcher) => {
      const match = matcher.regex.exec(content);

      if (!match || match.index === undefined) {
        return null;
      }

      return {
        type: matcher.type,
        match,
        index: match.index,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
    .sort((left, right) => left.index - right.index)[0];
}
