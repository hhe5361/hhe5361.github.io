import styled from '@emotion/styled';
import { FaArrowLeft, FaCalendarAlt, FaExternalLinkAlt, FaGithub, FaRegClock } from 'react-icons/fa';
import { MarkdownRenderer } from './MarkdownRenderer';
import { buildHomeHref } from './routes';
import type { Post } from './types';
import { theme } from '../../styles/theme';

const PageSection = styled.section`
  min-height: calc(100vh - 4.5rem);
  padding: ${theme.spacing.lg} 0 ${theme.spacing.xl};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} 0;
  }
`;

const ArticleShell = styled.article`
  max-width: 900px;
  margin: 0 auto;
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: 28px;
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const HeroPanel = styled.div<{ coverImage?: string }>`
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  background:
    linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(15, 23, 42, 0.85) 100%),
    ${props => (props.coverImage ? `url(${props.coverImage}) center / cover no-repeat` : theme.colors.gradient.main)};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: calc(${theme.spacing.xl} * 1.25);
  }
`;

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.accent};
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  color: ${theme.colors.light};
  margin-bottom: ${theme.spacing.md};
`;

const HeroSummary = styled.p`
  max-width: 720px;
  color: ${theme.colors.textLight};
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.8;
  opacity: 0.96;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  color: ${theme.colors.textLight};
`;

const MetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid ${theme.colors.glass.border};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: ${theme.colors.glass.card};
  color: ${theme.colors.accent};
  font-size: 0.9rem;
  font-weight: 600;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: 999px;
  font-weight: 600;
  background: ${theme.colors.gradient.accent};
  color: ${theme.colors.textDark};
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
  }
`;

const ArticleBody = styled.div`
  padding: ${theme.spacing.xl} ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: calc(${theme.spacing.xl} * 1.1);
  }
`;

const NotFoundPanel = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  border-radius: 24px;
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  text-align: center;

  h1 {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.light};
  }

  p {
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.textLight};
  }
`;

interface PostDetailPageProps {
  post: Post | null;
  requestedSlug: string;
}

export const PostDetailPage = ({ post, requestedSlug }: PostDetailPageProps) => {
  if (!post) {
    return (
      <PageSection aria-label="Post not found">
        <div className="container">
          <NotFoundPanel>
            <h1>Post not found</h1>
            <p>
              No post matched <code>{requestedSlug}</code>. Check the markdown filename or slug frontmatter.
            </p>
            <ActionLink href={buildHomeHref('projects')}>
              <FaArrowLeft aria-hidden="true" />
              Back to Featured Projects
            </ActionLink>
          </NotFoundPanel>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection aria-label={post.title}>
      <div className="container">
        <ArticleShell>
          <HeroPanel coverImage={post.coverImage}>
            <BackLink href={buildHomeHref('projects')}>
              <FaArrowLeft aria-hidden="true" />
              Back to Featured Projects
            </BackLink>
            <HeroTitle>{post.title}</HeroTitle>
            <HeroSummary>{post.summary}</HeroSummary>
            <MetaRow>
              {post.formattedDate ? (
                <MetaItem>
                  <FaCalendarAlt aria-hidden="true" />
                  <span>{post.formattedDate}</span>
                </MetaItem>
              ) : null}
              <MetaItem>
                <FaRegClock aria-hidden="true" />
                <span>{post.readingTimeMinutes} min read</span>
              </MetaItem>
            </MetaRow>
            {post.techStack.length > 0 ? (
              <TagList aria-label="Technology stack">
                {post.techStack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </TagList>
            ) : null}
            <ActionRow>
              {post.githubUrl ? (
                <ActionLink href={post.githubUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub aria-hidden="true" />
                  View repository
                </ActionLink>
              ) : null}
              {post.liveUrl ? (
                <ActionLink href={post.liveUrl} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt aria-hidden="true" />
                  Visit live site
                </ActionLink>
              ) : null}
            </ActionRow>
          </HeroPanel>
          <ArticleBody>
            <MarkdownRenderer markdown={post.content} />
          </ArticleBody>
        </ArticleShell>
      </div>
    </PageSection>
  );
};
