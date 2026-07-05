import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';
import aboutMarkdown from '/content/about.md?raw';
import profilePhoto from '../assets/profile-photo-updated.jpeg';
import { featuredPosts } from '../features/posts/content';
import { buildPostHref } from '../features/posts/routes';
import { theme } from '../styles/theme';

interface AboutValue {
  icon: string;
  title: string;
  description: string;
}

interface AboutContent {
  title: string;
  paragraphs: string[];
  values: AboutValue[];
}

const skillGroups = [
  {
    label: 'Language',
    items: ['Python', 'Java', 'Go', 'C++', 'C#'],
  },
  {
    label: 'Framework',
    items: ['.NET', 'Gin', 'Spring'],
  },
  {
    label: 'DevOps',
    items: ['AWS', 'Docker'],
  },
];

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: <FaGithub aria-hidden="true" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: <FaLinkedin aria-hidden="true" />,
  },
  {
    label: 'Email',
    href: 'mailto:your.email@example.com',
    icon: <FaEnvelope aria-hidden="true" />,
  },
];

const experienceItems = [
  {
    icon: '🎓',
    label: '경희대학교 입학',
    period: '2022.03',
  },
  {
    icon: '🔬',
    label: 'ICNS 연구실 학부연구생',
    period: '2024.10 - 2026.08',
  },
  {
    icon: '🎓',
    label: '경희대학교 졸업 예정',
    period: '2027.02',
  },
];

const aboutContent = parseAboutMarkdown(aboutMarkdown);

const PageShell = styled.div`
  min-height: calc(100vh - 4.5rem);
  width: min(94%, 1240px);
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 3.5rem) 0;

  @media (min-width: ${theme.breakpoints.lg}) {
    display: grid;
    grid-template-columns: minmax(180px, 2fr) minmax(0, 8fr);
    gap: clamp(1.5rem, 3vw, 3rem);
    align-items: start;
  }
`;

const Sidebar = styled.aside`
  padding: 0;

  @media (min-width: ${theme.breakpoints.lg}) {
    position: sticky;
    top: 6.25rem;
  }
`;

const ProfileFrame = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.muted};
  margin-bottom: ${theme.spacing.lg};
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.h1`
  color: ${theme.colors.heading};
  font-size: clamp(1.4rem, 2.4vw, 1.8rem);
  line-height: 1.08;
  margin-bottom: ${theme.spacing.xs};
`;

const Role = styled.p`
  color: ${theme.colors.accent};
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
`;

const SidebarSection = styled.section`
  padding-top: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};

  h2 {
    color: ${theme.colors.heading};
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    margin-bottom: ${theme.spacing.sm};
    text-transform: uppercase;
  }
`;

const SkillGroup = styled.div`
  & + & {
    margin-top: ${theme.spacing.md};
  }
`;

const SkillGroupTitle = styled.h3`
  color: ${theme.colors.heading};
  font-size: 0.85rem;
  margin-bottom: ${theme.spacing.xs};
`;

const ResumeList = styled.div`
  display: grid;
  gap: ${theme.spacing.sm};
`;

const ResumeItem = styled.div`
  display: grid;
  grid-template-columns: 1.35rem minmax(0, 1fr);
  gap: ${theme.spacing.xs};
  color: ${theme.colors.textMuted};
  font-size: 0.76rem;
  line-height: 1.45;
`;

const ResumeIcon = styled.span`
  line-height: 1.45;
`;

const ResumeText = styled.span`
  display: grid;
  gap: 0.15rem;
  min-width: 0;
`;

const ResumePeriod = styled.span`
  color: ${theme.colors.textMuted};
  font-size: 0.72rem;
`;

const SkillList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  list-style: none;
`;

const SkillPill = styled.li`
  border: 1px solid ${theme.colors.border};
  border-radius: 999px;
  color: ${theme.colors.text};
  font-size: 0.75rem;
  line-height: 1;
  padding: 0.35rem 0.55rem;
  background: ${theme.colors.muted};
`;

const ContactList = styled.div`
  display: grid;
  gap: ${theme.spacing.sm};
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  min-height: 2.4rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  color: ${theme.colors.heading};
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0 ${theme.spacing.sm};
  background: ${theme.colors.background};
  transition:
    border-color ${theme.transitions.default},
    color ${theme.transitions.default},
    transform ${theme.transitions.default};

  svg {
    color: ${theme.colors.accent};
    flex: 0 0 auto;
  }

  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.accent};
    transform: translateY(-1px);
  }
`;

const ContentColumn = styled.div`
  min-width: 0;
  margin-top: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.lg}) {
    margin-top: 0;
    border-left: 1px solid ${theme.colors.borderStrong};
    padding-left: clamp(2rem, 4vw, 4rem);
  }
`;

const IntroSection = styled.section`
  scroll-margin-top: 6rem;
  padding-bottom: clamp(2rem, 5vw, 4rem);
`;

const Eyebrow = styled.p`
  color: ${theme.colors.accent};
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  margin-bottom: ${theme.spacing.sm};
  text-transform: uppercase;
`;

const IntroTitle = styled.h2`
  color: ${theme.colors.heading};
  font-size: clamp(1.6rem, 3vw, 2.65rem);
  line-height: 1.12;
  max-width: 820px;
  margin-bottom: ${theme.spacing.lg};
`;

const IntroText = styled.div`
  display: grid;
  gap: ${theme.spacing.md};
  max-width: 780px;
  color: ${theme.colors.text};
  font-size: clamp(0.95rem, 1.55vw, 1.05rem);
  line-height: 1.8;
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

const Highlight = styled.div`
  border-top: 3px solid ${theme.colors.accent};
  background: ${theme.colors.surface};
  border-radius: 8px;
  padding: ${theme.spacing.lg};
  box-shadow: 0 14px 34px rgba(17, 24, 39, 0.06);

  strong {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    color: ${theme.colors.heading};
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.xs};
  }

  span {
    color: ${theme.colors.textMuted};
    font-size: 0.9rem;
  }
`;

const HighlightIcon = styled.span`
  font-size: 1.15rem;
  line-height: 1;
`;

const PortfolioSection = styled.section`
  scroll-margin-top: 6rem;
  padding-top: clamp(2rem, 5vw, 4rem);
  border-top: 1px solid ${theme.colors.border};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.lg};
  align-items: end;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    display: block;
  }
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.heading};
  font-size: clamp(1.55rem, 3.5vw, 2.15rem);
`;

const ProjectGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.md};
`;

const ProjectCard = styled(motion.a)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  background: ${theme.colors.surface};
  padding: clamp(1rem, 2vw, 1.35rem);
  box-shadow: 0 14px 34px rgba(17, 24, 39, 0.06);
  transition:
    border-color ${theme.transitions.default},
    box-shadow ${theme.transitions.default},
    transform ${theme.transitions.default};

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: minmax(180px, 0.34fr) minmax(0, 0.66fr);
    align-items: center;
  }

  &:hover {
    border-color: ${theme.colors.accent};
    box-shadow: 0 18px 42px rgba(17, 24, 39, 0.1);
    transform: translateY(-2px);
  }
`;

const ProjectThumbnail = styled.div<{ imageUrl?: string }>`
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(185, 28, 28, 0.18), rgba(17, 24, 39, 0.08)),
    ${theme.colors.muted};
  border: 1px solid ${theme.colors.border};

  ${props =>
    props.imageUrl
      ? `
        background:
          linear-gradient(180deg, rgba(17, 24, 39, 0.02), rgba(17, 24, 39, 0.24)),
          url(${props.imageUrl}) center / cover no-repeat;
      `
      : ''}
`;

const ProjectBody = styled.div`
  min-width: 0;
`;

const ProjectTitle = styled.h3`
  color: ${theme.colors.heading};
  font-size: clamp(1.12rem, 2.5vw, 1.38rem);
  margin-bottom: ${theme.spacing.sm};
`;

const ProjectInfo = styled.div`
  display: grid;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const ProjectInfoRow = styled.p`
  color: ${theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.75;
`;

const ProjectDate = styled.p`
  color: ${theme.colors.textMuted};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.82rem;
  margin-top: ${theme.spacing.md};
`;

const EmptyState = styled.div`
  border: 1px dashed ${theme.colors.borderStrong};
  border-radius: 8px;
  color: ${theme.colors.textMuted};
  padding: ${theme.spacing.xl};
  text-align: center;
`;

export const HomePage = () => {
  return (
    <PageShell>
      <Sidebar id="contact" aria-label="Profile, skills, and contact">
        <ProfileFrame>
          <ProfileImage
            src={profilePhoto}
            alt="Portrait of Hyoeun Hwang"
          />
        </ProfileFrame>
        <Name>Hyoeun Hwang</Name>
        <Role>Backend Developer</Role>

        <SidebarSection aria-labelledby="resume-title">
          <h2 id="resume-title">Experience</h2>
          <ResumeList>
            {experienceItems.map((item) => (
              <ResumeItem key={`${item.label}-${item.period}`}>
                <ResumeIcon aria-hidden="true">{item.icon}</ResumeIcon>
                <ResumeText>
                  <span>{item.label}</span>
                  <ResumePeriod>{item.period}</ResumePeriod>
                </ResumeText>
              </ResumeItem>
            ))}
          </ResumeList>
        </SidebarSection>

        <SidebarSection aria-labelledby="skills-title">
          <h2 id="skills-title">Skill Set</h2>
          {skillGroups.map((group) => (
            <SkillGroup key={group.label}>
              <SkillGroupTitle>{group.label}</SkillGroupTitle>
              <SkillList aria-label={`${group.label} skills`}>
                {group.items.map((item) => (
                  <SkillPill key={item}>{item}</SkillPill>
                ))}
              </SkillList>
            </SkillGroup>
          ))}
        </SidebarSection>

        <SidebarSection aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <ContactList>
            {contactLinks.map((link) => (
              <ContactLink
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.icon}
                <span>{link.label}</span>
              </ContactLink>
            ))}
          </ContactList>
        </SidebarSection>
      </Sidebar>

      <ContentColumn>
        <IntroSection id="about" aria-label="About Hyoeun Hwang">
          <Eyebrow>About</Eyebrow>
          <IntroTitle>
            {aboutContent.title}
          </IntroTitle>
          <IntroText>
            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </IntroText>
          <HighlightGrid aria-label="Portfolio highlights">
            {aboutContent.values.map((value) => (
              <Highlight key={value.title}>
                <strong>
                  {value.icon ? (
                    <HighlightIcon aria-hidden="true">{value.icon}</HighlightIcon>
                  ) : null}
                  {value.title}
                </strong>
                <span>{value.description}</span>
              </Highlight>
            ))}
          </HighlightGrid>
        </IntroSection>

        <PortfolioSection id="portfolio" aria-label="Portfolio projects">
          <SectionHeader>
            <div>
              <Eyebrow>Portfolio</Eyebrow>
              <SectionTitle>My Works</SectionTitle>
            </div>
          </SectionHeader>

          {featuredPosts.length === 0 ? (
            <EmptyState>
              No featured posts yet. Add markdown files under content/posts.
            </EmptyState>
          ) : (
            <ProjectGrid role="list">
              {featuredPosts.map((project) => (
                <ProjectCard
                  key={project.slug}
                  href={buildPostHref(project.slug)}
                  role="listitem"
                  aria-label={`${project.title} 상세 페이지로 이동`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectThumbnail
                    imageUrl={project.coverImage}
                    aria-hidden="true"
                  />
                  <ProjectBody>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectInfo>
                      <ProjectInfoRow>{project.summary}</ProjectInfoRow>
                    </ProjectInfo>
                    {project.formattedDate ? (
                      <ProjectDate>
                        <span aria-hidden="true">📅</span>
                        <span>{project.formattedDate}</span>
                      </ProjectDate>
                    ) : null}
                  </ProjectBody>
                </ProjectCard>
              ))}
            </ProjectGrid>
          )}
        </PortfolioSection>
      </ContentColumn>
    </PageShell>
  );
};

function parseAboutMarkdown(markdown: string): AboutContent {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const title = lines.find((line) => line.startsWith('# '))?.replace(/^#\s+/, '').trim() || '';
  const introSection = extractSection(lines, '소개');
  const valueSection = extractSection(lines, '핵심 가치관');

  return {
    title,
    paragraphs: collectParagraphs(introSection),
    values: collectValues(valueSection),
  };
}

function extractSection(lines: string[], heading: string) {
  const startIndex = lines.findIndex((line) => line.trim() === `## ${heading}`);

  if (startIndex === -1) {
    return [];
  }

  const sectionLines: string[] = [];

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    if (lines[index].startsWith('## ')) {
      break;
    }

    sectionLines.push(lines[index]);
  }

  return sectionLines;
}

function collectParagraphs(lines: string[]) {
  return lines
    .join('\n')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function collectValues(lines: string[]) {
  const values: AboutValue[] = [];
  let currentTitle = '';
  let currentIcon = '';
  let currentLines: string[] = [];

  const flushValue = () => {
    if (!currentTitle) {
      return;
    }

    const description = collectParagraphs(currentLines).join(' ');

    values.push({
      icon: currentIcon,
      title: currentTitle,
      description,
    });
  };

  lines.forEach((line) => {
    if (line.startsWith('### ')) {
      flushValue();
      currentTitle = line.replace(/^###\s+/, '').trim();
      currentIcon = '';
      currentLines = [];
      return;
    }

    const icon = line.match(/^이모티콘\s*:\s*(.+)$/);

    if (icon) {
      currentIcon = icon[1].trim();
      return;
    }

    currentLines.push(line);
  });

  flushValue();

  return values;
}
