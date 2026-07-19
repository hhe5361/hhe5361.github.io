import type { Post } from './types';

type FrontmatterValue = string | string[] | boolean;
type Frontmatter = Record<string, FrontmatterValue>;

const rawPostFiles = import.meta.glob('/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const posts = Object.entries(rawPostFiles)
  .filter(([path]) => !getFileName(path).startsWith('_'))
  .map(([path, source]) => createPost(path, source))
  .sort((left, right) => right.date.localeCompare(left.date));

export const allPosts = posts;
export const featuredPosts = posts.filter((post) => post.featured);

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug) ?? null;

function createPost(path: string, source: string): Post {
  const { frontmatter, body } = parsePostFile(source);
  const slug = resolveSlug(frontmatter, path);
  const title = readString(frontmatter.title) || humanizeSlug(slug);
  const date = readString(frontmatter.date) || '';
  const summary = resolveSummary(frontmatter, body);

  return {
    slug,
    title,
    date,
    formattedDate: formatDate(date),
    summary,
    content: body,
    period: readOptionalString(frontmatter.period),
    affiliation: readOptionalString(frontmatter.affiliation),
    teamSize: readOptionalString(frontmatter.teamSize),
    highlights: readStringList(frontmatter.highlights),
    coverImage: readOptionalString(frontmatter.coverImage),
    githubUrl: readOptionalString(frontmatter.githubUrl),
    liveUrl: readOptionalString(frontmatter.liveUrl),
    techStack: readStringList(frontmatter.techStack),
    featured: readBoolean(frontmatter.featured),
    readingTimeMinutes: estimateReadingTime(body),
  };
}

function parsePostFile(source: string) {
  const normalized = source.replace(/\r\n/g, '\n');

  if (!normalized.startsWith('---\n')) {
    return {
      frontmatter: {} as Frontmatter,
      body: normalized.trim(),
    };
  }

  const endIndex = normalized.indexOf('\n---\n', 4);

  if (endIndex === -1) {
    return {
      frontmatter: {} as Frontmatter,
      body: normalized.trim(),
    };
  }

  return {
    frontmatter: parseFrontmatter(normalized.slice(4, endIndex)),
    body: normalized.slice(endIndex + 5).trim(),
  };
}

function parseFrontmatter(source: string): Frontmatter {
  const lines = source.split('\n');
  const result: Frontmatter = {};

  for (let index = 0; index < lines.length; index += 1) {
    const trimmedLine = lines[index].trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const entry = trimmedLine.match(/^([A-Za-z][\w-]*):\s*(.*)$/);

    if (!entry) {
      continue;
    }

    const [, key, rawValue] = entry;
    const value = rawValue.trim();

    if (value) {
      result[key] = parseScalar(value);
      continue;
    }

    const listValues: string[] = [];
    let nextIndex = index + 1;

    while (nextIndex < lines.length) {
      const nextLine = lines[nextIndex];
      const nextTrimmed = nextLine.trim();

      if (!nextTrimmed || nextTrimmed.startsWith('#')) {
        nextIndex += 1;
        continue;
      }

      const listItem = nextLine.match(/^\s*-\s+(.*)$/);

      if (!listItem) {
        break;
      }

      listValues.push(String(parseScalar(listItem[1].trim())));
      nextIndex += 1;
    }

    result[key] = listValues.length > 0 ? listValues : '';
    index = nextIndex - 1;
  }

  return result;
}

function parseScalar(value: string): FrontmatterValue {
  const unwrapped = unwrapQuotedValue(value);

  if (unwrapped === 'true') {
    return true;
  }

  if (unwrapped === 'false') {
    return false;
  }

  return unwrapped;
}

function unwrapQuotedValue(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith('\'') && value.endsWith('\''))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function resolveSlug(frontmatter: Frontmatter, path: string) {
  const slugFromFrontmatter = readOptionalString(frontmatter.slug);
  return slugify(slugFromFrontmatter || getFileName(path).replace(/\.md$/i, ''));
}

function resolveSummary(frontmatter: Frontmatter, body: string) {
  const manualSummary = readOptionalString(frontmatter.summary);
  return manualSummary || extractSummaryFromBody(body);
}

function extractSummaryFromBody(body: string) {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const candidate =
    paragraphs.find((paragraph) => {
      const trimmed = paragraph.trim();

      return (
        !trimmed.startsWith('#') &&
        !trimmed.startsWith('```') &&
        !trimmed.startsWith('>') &&
        !trimmed.startsWith('- ') &&
        !trimmed.startsWith('* ') &&
        !/^\d+\.\s/.test(trimmed)
      );
    }) ?? paragraphs[0] ?? '';

  return truncate(stripMarkdown(candidate), 180);
}

function estimateReadingTime(body: string) {
  const wordCount = stripMarkdown(body)
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(wordCount / 220));
}

function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
}

function formatDate(value: string) {
  if (!value) {
    return '';
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parsedDate);
}

function readString(value: FrontmatterValue | undefined) {
  return typeof value === 'string' ? value.trim() : '';
}

function readOptionalString(value: FrontmatterValue | undefined) {
  const resolved = readString(value);
  return resolved || undefined;
}

function readStringList(value: FrontmatterValue | undefined) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => String(entry).trim())
    .filter(Boolean);
}

function readBoolean(value: FrontmatterValue | undefined) {
  return value === true;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function humanizeSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function getFileName(path: string) {
  const parts = path.split('/');
  return parts[parts.length - 1];
}
