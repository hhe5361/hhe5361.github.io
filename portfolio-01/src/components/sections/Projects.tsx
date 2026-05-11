import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaRegClock } from 'react-icons/fa';
import { featuredPosts } from '../../features/posts/content';
import { buildPostHref } from '../../features/posts/routes';
import { theme } from '../../styles/theme';

const ProjectsSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: ${theme.spacing.lg} 0;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.textLight};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -${theme.spacing.md};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: ${theme.colors.accent};
    border-radius: 2px;
  }
`;

const SectionIntro = styled.p`
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  color: ${theme.colors.textLight};
  opacity: 0.82;
  line-height: 1.8;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: ${theme.spacing.lg};
  width: 100%;
  margin-top: ${theme.spacing.xl};

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.xl};
  }
`;

const ProjectCard = styled(motion.article)`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  border-radius: 18px;
  overflow: hidden;
  color: ${theme.colors.textLight};
  transition: all ${theme.transitions.default};
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(56, 189, 248, 0.15);
  }
`;

const ProjectImage = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 180px;
  background:
    linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(15, 23, 42, 0.9) 100%),
    ${props => (props.imageUrl ? `url(${props.imageUrl}) center / cover no-repeat` : theme.colors.gradient.main)};
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.md}) {
    height: 220px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.55), transparent);
  }
`;

const ProjectImageLabel = styled.span`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.72);
  border: 1px solid ${theme.colors.glass.border};
  color: ${theme.colors.light};
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const ProjectContent = styled.div`
  padding: ${theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
`;

const ProjectTitle = styled.h3`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.light};
  font-weight: 600;
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.textLight};
  opacity: 0.78;
  font-size: 0.9rem;
`;

const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.35);
  border: 1px solid ${theme.colors.glass.border};
`;

const ProjectDescription = styled.p`
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.lg};
  font-size: clamp(0.9rem, 2vw, 1rem);
  line-height: 1.75;
  flex: 1;
  opacity: 0.9;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const TechTag = styled.span`
  background: ${theme.colors.glass.card};
  color: ${theme.colors.accent};
  padding: 4px 10px;
  border-radius: 20px;
  font-size: clamp(0.75rem, 2vw, 0.85rem);
  font-weight: 500;
  transition: all ${theme.transitions.default};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 6px 12px;
  }

  &:hover {
    background: ${theme.colors.gradient.accent};
    color: ${theme.colors.textDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  margin-top: auto;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  a {
    display: inline-flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    color: ${theme.colors.accent};
    font-size: clamp(0.95rem, 2vw, 1rem);
    font-weight: 600;
    transition: all ${theme.transitions.default};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.25);

    &:hover {
      color: ${theme.colors.light};
      background: ${theme.colors.glass.card};
      transform: translateY(-2px);
    }
  }
`;

const EmptyState = styled.div`
  margin-top: ${theme.spacing.xl};
  padding: ${theme.spacing.xl};
  text-align: center;
  border-radius: 20px;
  background: ${theme.colors.glass.background};
  color: ${theme.colors.textLight};
  border: 1px solid ${theme.colors.glass.border};
`;

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <ProjectsSection id="projects" role="region" aria-label="Featured Projects">
      <div className="container">
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          role="heading"
          aria-level={2}
        >
          Featured Projects
        </SectionTitle>
        <SectionIntro>
          Each project card is backed by a markdown post, so you can manage project details as content and still render them consistently across the portfolio.
        </SectionIntro>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredPosts.length === 0 ? (
            <EmptyState>
              No featured posts yet. Add markdown files under <code>content/posts</code>.
            </EmptyState>
          ) : (
            <ProjectGrid role="list">
              {featuredPosts.map((project) => (
                <ProjectCard
                  key={project.slug}
                  variants={itemVariants}
                  role="listitem"
                  aria-labelledby={`project-title-${project.slug}`}
                >
                  <ProjectImage
                    imageUrl={project.coverImage}
                    role="img"
                    aria-label={`${project.title} cover`}
                  >
                    <ProjectImageLabel>Project Post</ProjectImageLabel>
                  </ProjectImage>
                  <ProjectContent>
                    <ProjectTitle id={`project-title-${project.slug}`}>
                      {project.title}
                    </ProjectTitle>
                    <ProjectMeta>
                      {project.formattedDate ? (
                        <MetaPill>{project.formattedDate}</MetaPill>
                      ) : null}
                      <MetaPill>
                        <FaRegClock aria-hidden="true" />
                        {project.readingTimeMinutes} min read
                      </MetaPill>
                    </ProjectMeta>
                    <ProjectDescription>{project.summary}</ProjectDescription>
                    <TechStack role="list" aria-label={`Technologies used in ${project.title}`}>
                      {project.techStack.map((tech) => (
                        <TechTag key={tech} role="listitem">
                          {tech}
                        </TechTag>
                      ))}
                    </TechStack>
                    <ProjectLinks>
                      <a
                        href={buildPostHref(project.slug)}
                        aria-label={`Read the full post for ${project.title}`}
                      >
                        <FaArrowRight aria-hidden="true" />
                        <span>Read post</span>
                      </a>
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <FaGithub aria-hidden="true" />
                          <span>GitHub</span>
                        </a>
                      ) : null}
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.title} live site`}
                        >
                          <FaExternalLinkAlt aria-hidden="true" />
                          <span>Live site</span>
                        </a>
                      ) : null}
                    </ProjectLinks>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </ProjectGrid>
          )}
        </motion.div>
      </div>
    </ProjectsSection>
  );
};

export default Projects;
