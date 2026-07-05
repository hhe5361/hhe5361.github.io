import styled from '@emotion/styled';
import { FaArrowLeft } from 'react-icons/fa';
import { MarkdownRenderer } from './MarkdownRenderer';
import { buildHomeHref } from './routes';
import type { Post } from './types';
import { theme } from '../../styles/theme';

const PageSection = styled.section`
  min-height: calc(100vh - 4.5rem);
  padding: ${theme.spacing.lg} 0 ${theme.spacing.xl};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg} 0 ${theme.spacing.xl};
  }
`;

const DetailContainer = styled.div`
  width: min(94%, 1180px);
  margin: 0 auto;
`;

const ArticleShell = styled.article`
  max-width: 1120px;
  margin: 0 auto;
`;

const HeroPanel = styled.div`
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
`;

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.accent};
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.6rem, 3.5vw, 2.45rem);
  color: ${theme.colors.heading};
  margin-bottom: ${theme.spacing.md};
`;

const HeroSummary = styled.p`
  max-width: 720px;
  color: ${theme.colors.text};
  font-size: clamp(0.95rem, 1.7vw, 1.05rem);
  line-height: 1.8;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
  color: ${theme.colors.textMuted};
`;

const MetaItem = styled.p`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.textMuted};
  font-size: 0.84rem;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: ${theme.colors.surface};
  color: ${theme.colors.accent};
  border: 1px solid ${theme.colors.border};
  font-size: 0.85rem;
  font-weight: 700;
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
  padding-top: ${theme.spacing.xl};
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
            <ActionLink href={buildHomeHref('portfolio')}>
              <FaArrowLeft aria-hidden="true" />
              Back to Portfolio
            </ActionLink>
          </NotFoundPanel>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection aria-label={post.title}>
      <DetailContainer>
        <ArticleShell>
          <HeroPanel>
            <BackLink href={buildHomeHref('portfolio')}>
              <FaArrowLeft aria-hidden="true" />
              Back to Portfolio
            </BackLink>
            <HeroTitle>{post.title}</HeroTitle>
            <HeroSummary>{post.summary}</HeroSummary>
            <MetaRow>
              {post.formattedDate ? (
                <MetaItem>
                  <span aria-hidden="true">📅</span>
                  <span>{post.formattedDate}</span>
                </MetaItem>
              ) : null}
            </MetaRow>
            {post.techStack.length > 0 ? (
              <TagList aria-label="Technology stack">
                {post.techStack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </TagList>
            ) : null}
          </HeroPanel>
          <ArticleBody>
            <MarkdownRenderer markdown={post.content} />
          </ArticleBody>
        </ArticleShell>
      </DetailContainer>
    </PageSection>
  );
};
