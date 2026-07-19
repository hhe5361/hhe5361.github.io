import styled from '@emotion/styled';
import { type ReactNode } from 'react';
import { theme } from '../../styles/theme';

type MarkdownBlock =
  | { type: 'heading'; level: number; content: string }
  | { type: 'paragraph'; content: string }
  | { type: 'blockquote'; content: string }
  | { type: 'unordered-list'; items: string[] }
  | { type: 'ordered-list'; items: string[] }
  | { type: 'table'; header: string[]; rows: string[][] }
  | { type: 'code'; language: string; content: string }
  | { type: 'image'; alt: string; src: string }
  | { type: 'divider' };

const Content = styled.div`
  display: grid;
  gap: ${theme.spacing.md};
  color: ${theme.colors.text};

  h2 {
    color: ${theme.colors.heading};
    font-size: clamp(1.2rem, 2.5vw, 1.55rem);
    margin-top: ${theme.spacing.lg};
  }

  h2:first-of-type {
    margin-top: 0;
  }

  h3 {
    color: ${theme.colors.heading};
    font-size: 0.98rem;
    margin-top: ${theme.spacing.md};
  }

  h4 {
    color: ${theme.colors.accent};
    font-size: 0.9rem;
    font-weight: 700;
    margin-top: ${theme.spacing.sm};
  }

  h5,
  h6 {
    color: ${theme.colors.heading};
  }

  p {
    font-size: 0.95rem;
    line-height: 1.8;
  }

  ul,
  ol {
    margin: 0;
    padding-left: 1.25rem;
    border: 0;
    background: transparent;
  }

  li {
    font-size: 0.95rem;
    line-height: 1.75;
    margin: 0 0 ${theme.spacing.sm};
  }

  li strong:first-child {
    color: ${theme.colors.accent};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: ${theme.spacing.sm};
    font-size: 0.92rem;
  }

  th,
  td {
    padding: 0.75rem 0.85rem;
    border: 1px solid ${theme.colors.border};
    text-align: left;
    vertical-align: top;
  }

  th {
    background: ${theme.colors.muted};
    color: ${theme.colors.heading};
    font-weight: 700;
  }

  blockquote {
    border-left: 4px solid ${theme.colors.accent};
    padding-left: ${theme.spacing.md};
    color: ${theme.colors.heading};
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
    background: ${theme.colors.heading};
    border-radius: 8px;
    padding: ${theme.spacing.lg};
  }

  pre code {
    display: block;
    white-space: pre;
    color: ${theme.colors.light};
  }

  hr {
    border: none;
    border-top: 1px solid ${theme.colors.border};
  }

  img {
    width: auto;
    max-width: min(100%, 720px);
    max-height: 30rem;
    justify-self: center;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid ${theme.colors.border};
    background: ${theme.colors.background};
  }

  .inline-code {
    background: ${theme.colors.muted};
    color: ${theme.colors.heading};
    border-radius: 4px;
    padding: 0.15rem 0.4rem;
  }
`;

const SummaryPanel = styled.div`
  display: grid;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  background: ${theme.colors.surface};
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.05);

  hr {
    display: none;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: ${theme.spacing.sm};

  img {
    width: 100%;
    max-height: 14rem;
    object-fit: contain;
    background: ${theme.colors.background};
  }
`;

const SummaryImage = styled.img`
  width: auto;
  max-width: min(100%, 760px);
  height: auto;
  max-height: 32rem;
  justify-self: center;
  object-fit: contain;
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
      {renderBlocks(blocks)}
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

    if (trimmed.includes('|') && index + 1 < lines.length && isTableDividerLine(lines[index + 1])) {
      const tableLines: string[] = [trimmed];
      index += 1;

      while (index < lines.length && lines[index].trim().includes('|')) {
        tableLines.push(lines[index].trim());
        index += 1;
      }

      blocks.push(parseTableBlock(tableLines));
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
    case 'table':
      return (
        <table key={key}>
          <thead>
            <tr>
              {block.header.map((cell, cellIndex) => (
                <th key={`${key}-head-${cellIndex}`}>{renderInline(cell, `${key}-head-${cellIndex}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`${key}-row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${key}-row-${rowIndex}-${cellIndex}`}>
                    {renderInline(cell, `${key}-row-${rowIndex}-${cellIndex}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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

function renderBlockSequence(blocks: MarkdownBlock[], keyPrefix: string) {
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    if (blocks[index].type === 'image') {
      const images: Extract<MarkdownBlock, { type: 'image' }>[] = [];

      while (index < blocks.length && blocks[index].type === 'image') {
        images.push(blocks[index] as Extract<MarkdownBlock, { type: 'image' }>);
        index += 1;
      }

      const hasArchitectureImage = images.some((image) => /architecture|아키텍처|개념도/i.test(image.alt));

      if (images.length === 1 && hasArchitectureImage) {
        const image = images[0];
        nodes.push(<SummaryImage key={`${keyPrefix}-summary-image-${index}`} src={image.src} alt={image.alt} />);
        continue;
      }

      nodes.push(
        <ImageGrid key={`${keyPrefix}-image-grid-${index}`}>
          {images.map((image, imageIndex) => (
            <img
              key={`${keyPrefix}-image-${index}-${imageIndex}`}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </ImageGrid>,
      );
      continue;
    }

    nodes.push(renderBlock(blocks[index], index));
    index += 1;
  }

  return nodes;
}

function renderBlocks(blocks: MarkdownBlock[]) {
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];

    if (isSummarySectionHeading(block)) {
      nodes.push(renderBlock(block, index));

      const { sectionBlocks, nextIndex } = collectSectionBlocks(blocks, index + 1);

      if (sectionBlocks.length > 0) {
        nodes.push(
          <SummaryPanel key={`summary-panel-${index}`}>
            {renderBlockSequence(sectionBlocks, `summary-panel-${index}`)}
          </SummaryPanel>,
        );
        index = nextIndex;
        continue;
      }
    }

    nodes.push(renderBlock(block, index));
    index += 1;
  }

  return nodes;
}

function isSummarySectionHeading(block: MarkdownBlock) {
  return (
    block.type === 'heading' &&
    block.level === 2 &&
    /project\s+summary|프로젝트\s*개요/i.test(block.content)
  );
}

function collectSectionBlocks(blocks: MarkdownBlock[], startIndex: number) {
  const sectionBlocks: MarkdownBlock[] = [];
  let index = startIndex;

  while (index < blocks.length) {
    const block = blocks[index];

    if (block.type === 'heading' && block.level === 2) {
      break;
    }

    sectionBlocks.push(block);
    index += 1;
  }

  return { sectionBlocks, nextIndex: index };
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

function isTableDividerLine(line: string) {
  return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line.trim());
}

function parseTableBlock(lines: string[]): Extract<MarkdownBlock, { type: 'table' }> {
  const rows = lines
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => cell.trim()),
    )
    .filter((row) => row.some((cell) => cell.length > 0));

  const [header = [], ...bodyRows] = rows;

  return {
    type: 'table',
    header,
    rows: bodyRows,
  };
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
