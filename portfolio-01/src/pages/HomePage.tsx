import styled from '@emotion/styled';
import {
  FaArrowRight,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';
import aboutMarkdown from '/content/about.md?raw';
import profilePhoto from '../assets/profile-photo-updated.jpeg';
import { featuredPosts } from '../features/posts/content';
import { buildPostHref } from '../features/posts/routes';
import { theme } from '../styles/theme';

interface AboutContent {
  title: string;
  paragraphs: string[];
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

const educationItems = [
  {
    label: '경희대학교 컴퓨터공학과',
    period: '2022.03 - 2026.08',
    note: '22학번',
  },
  {
    label: 'ICNS 컨티뉴엄 클라우드 컴퓨팅 연구실',
    period: '2024.11 - 현재',
    note: '학부연구생',
  },
];

const activityItems = [
  {
    period: '2024.11 - 현재',
    icon: '📚',
    category: 'Research',
    title: 'ICNS 컨티뉴엄 클라우드 컴퓨팅 연구실',
    description: '경희대학교 학부연구생',
  },
  {
    period: '2024.03 - 2024.06',
    icon: '👦',
    category: 'Volunteer',
    title: '찾아가는 SW 교육 기부단',
    description: '코드클럽 주관 소프트웨어 교육 봉사',
  },
  {
    period: '2023.12 - 2024.02',
    icon: '👦',
    category: 'Volunteer',
    title: '소프트웨어야 놀자 겨울 캠프',
    description: '네이버 주관 소프트웨어 교육 봉사',
  },
  {
    period: '2023.06 - 2023.08',
    icon: '👦',
    category: 'Volunteer',
    title: '소프트웨어야 놀자 여름 캠프',
    description: '네이버 주관 소프트웨어 교육 봉사',
  },
  {
    period: '2022.03 - 2026.08',
    icon: '🎓',
    category: 'Education',
    title: '경희대학교 컴퓨터공학과',
    description: '22학번',
  },
];

const awardItems = [
  {
    period: '2023',
    icon: '🏆',
    category: 'Award',
    title: '경희대학교 트랙 프로젝트',
    description: '프로젝트 참여 및 우수상 수상',
  },
  {
    period: '2022',
    icon: '🏆',
    category: 'Award',
    title: '경희대학교 SW 페스티벌',
    description: 'KHUSHARE 프로젝트 · 임베디드·앱 부문 주니어상 수상',
  },
];

const aboutContent = parseAboutMarkdown(aboutMarkdown);

const PageShell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 4.5rem);
  width: min(94%, 1320px);
  margin: 0 auto;
  padding: clamp(1.5rem, 3vw, 2.75rem) 0 clamp(3rem, 6vw, 5rem);

  @media (min-width: ${theme.breakpoints.lg}) {
    display: grid;
    grid-template-columns: minmax(150px, 1.45fr) minmax(0, 8.55fr);
    gap: clamp(1.5rem, 2.6vw, 2.75rem);
    align-items: start;
  }
`;

const Sidebar = styled.aside`
  padding: 0;

  @media (max-width: calc(${theme.breakpoints.lg} - 1px)) {
    order: 2;
    margin-top: ${theme.spacing.xl};
    padding-top: ${theme.spacing.lg};
    border-top: 1px solid ${theme.colors.borderStrong};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    position: sticky;
    top: 6rem;
  }
`;

const ProfileFrame = styled.div`
  width: min(100%, 164px);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.muted};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: calc(${theme.breakpoints.lg} - 1px)) {
    width: 112px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.h1`
  color: ${theme.colors.heading};
  font-size: clamp(1.25rem, 2vw, 1.55rem);
  line-height: 1.15;
  margin-bottom: ${theme.spacing.xs};
`;

const Role = styled.p`
  color: ${theme.colors.accent};
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
`;

const SidebarSection = styled.section`
  padding-top: 1.2rem;
  margin-top: 1.2rem;
  border-top: 1px solid ${theme.colors.border};

  h2 {
    color: ${theme.colors.heading};
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    margin-bottom: 0.7rem;
    text-transform: uppercase;
  }
`;

const ResumeList = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const ResumeItem = styled.div`
  display: grid;
  gap: 0.12rem;
  color: ${theme.colors.text};
  font-size: 0.73rem;
  line-height: 1.45;
`;

const ResumePeriod = styled.span`
  color: ${theme.colors.textMuted};
  font-size: 0.68rem;
`;

const ResumeNote = styled.span`
  color: ${theme.colors.textMuted};
  font-size: 0.68rem;
`;

const SkillGroup = styled.div`
  & + & {
    margin-top: 0.7rem;
  }
`;

const SkillGroupTitle = styled.h3`
  color: ${theme.colors.textMuted};
  font-size: 0.68rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const SkillText = styled.p`
  color: ${theme.colors.text};
  font-size: 0.72rem;
  line-height: 1.55;
`;

const ContactList = styled.div`
  display: flex;
  gap: 0.45rem;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  color: ${theme.colors.heading};
  background: ${theme.colors.background};
  transition:
    border-color ${theme.transitions.default},
    color ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.accent};
  }
`;

const ContentColumn = styled.div`
  min-width: 0;

  @media (max-width: calc(${theme.breakpoints.lg} - 1px)) {
    order: 1;
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    border-left: 1px solid ${theme.colors.borderStrong};
    padding-left: clamp(2rem, 3.5vw, 3.75rem);
  }
`;

const IntroSection = styled.section`
  scroll-margin-top: 6rem;
  padding-bottom: clamp(1.75rem, 3vw, 2.75rem);
`;

const Eyebrow = styled.p`
  color: ${theme.colors.accent};
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  margin-bottom: 0.65rem;
  text-transform: uppercase;
`;

const IntroTitle = styled.h2`
  color: ${theme.colors.heading};
  font-size: clamp(1.55rem, 2.8vw, 2.35rem);
  line-height: 1.25;
  max-width: 880px;
  margin-bottom: ${theme.spacing.md};
`;

const IntroText = styled.div`
  display: grid;
  gap: 0.55rem;
  max-width: 820px;
  color: ${theme.colors.text};
  font-size: clamp(0.86rem, 1.3vw, 0.94rem);
  line-height: 1.7;
`;

const ExperienceSection = styled.section`
  scroll-margin-top: 6rem;
  padding-top: clamp(1.75rem, 3vw, 2.75rem);
  border-top: 1px solid ${theme.colors.border};
`;

const ActivitiesSection = styled.section`
  scroll-margin-top: 6rem;
  margin-top: clamp(1.75rem, 3vw, 2.75rem);
  padding-top: clamp(1.75rem, 3vw, 2.75rem);
  border-top: 1px solid ${theme.colors.border};
`;

const SectionHeader = styled.div`
  margin-bottom: 0.8rem;
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.heading};
  font-size: clamp(1.35rem, 2.5vw, 1.85rem);
`;

const CareerList = styled.div`
  display: grid;
`;

const CareerItem = styled.article`
  display: grid;
  grid-template-columns: 105px minmax(0, 1fr);
  gap: clamp(0.75rem, 1.2vw, 1rem);
  padding: 1.5rem 0;
  border-top: 1px solid ${theme.colors.border};

  &:first-of-type {
    border-top: 0;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 0.55rem;
  }
`;

const CareerMeta = styled.div`
  color: ${theme.colors.textMuted};
  font-size: 0.72rem;
  line-height: 1.55;
`;

const CareerPeriod = styled.p`
  color: ${theme.colors.heading};
  font-size: 0.76rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  white-space: nowrap;
`;

const CareerBody = styled.div`
  min-width: 0;
`;

const CareerContent = styled.div`
  display: grid;
  grid-template-columns: minmax(210px, 0.42fr) minmax(0, 1fr);
  gap: 0.8rem clamp(1rem, 1.8vw, 1.5rem);
  align-items: stretch;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CareerDetails = styled.div`
  min-width: 0;
`;

const CareerTitle = styled.h3`
  color: ${theme.colors.heading};
  font-family: ${theme.fonts.heading};
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  font-weight: 600;
  line-height: 1.4;
`;

const CareerThumbnail = styled.img`
  grid-column: 1;
  grid-row: 1 / span 2;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  background: ${theme.colors.muted};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: 1;
    grid-row: auto;
    max-width: 32rem;
  }
`;

const WorksLink = styled.a`
  display: inline-flex;
  align-items: center;
  grid-column: 2;
  justify-self: end;
  gap: 0.55rem;
  min-height: 2.4rem;
  padding: 0.55rem 0.85rem;
  border-radius: 6px;
  background: ${theme.colors.heading};
  color: ${theme.colors.textDark};
  font-size: 0.78rem;
  font-weight: 700;
  transition:
    background-color ${theme.transitions.default},
    transform ${theme.transitions.default};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: 1;
  }

  svg {
    flex: 0 0 auto;
    font-size: 0.68rem;
    transition: transform ${theme.transitions.default};
  }

  &:hover {
    background: ${theme.colors.accent};
    transform: translateY(-1px);

    svg {
      transform: translateX(3px);
    }
  }
`;

const CareerSummary = styled.p`
  color: ${theme.colors.text};
  font-size: 0.86rem;
  line-height: 1.7;
  margin-top: 0.55rem;
`;

const HighlightList = styled.ul`
  display: grid;
  gap: 0.3rem;
  margin-top: 0.75rem;
  padding-left: 1rem;
  color: ${theme.colors.text};
  font-size: 0.82rem;
  line-height: 1.65;

  li::marker {
    color: ${theme.colors.accent};
  }
`;

const TechList = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 0.72rem;
  line-height: 1.6;
  margin-top: 0.8rem;
`;

const EmptyState = styled.p`
  border-top: 1px solid ${theme.colors.border};
  color: ${theme.colors.textMuted};
  padding: ${theme.spacing.lg} 0;
`;

const ActivityList = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const ActivityColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const ActivityColumn = styled.div<{ $divided?: boolean }>`
  min-width: 0;
  padding: 0 clamp(1rem, 2.5vw, 2.25rem);
  border-right: ${({ $divided }) => ($divided ? `1px solid ${theme.colors.borderStrong}` : '0')};

  &:first-of-type {
    padding-left: 0;
  }

  &:last-of-type {
    padding-right: 0;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0;
    border-right: 0;
  }
`;

const ActivityColumnTitle = styled.h2`
  color: ${theme.colors.heading};
  font-size: clamp(1.2rem, 2.2vw, 1.6rem);
  margin-bottom: ${theme.spacing.md};
`;

const ActivityItem = styled.article`
  display: grid;
  grid-template-columns: 105px minmax(0, 1fr);
  gap: clamp(0.75rem, 1.2vw, 1rem);
  padding: 0.65rem 0;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
`;

const ActivityPeriod = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.55;
  white-space: nowrap;
`;

const ActivityBody = styled.div`
  min-width: 0;
`;

const ActivityType = styled.p`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: ${theme.colors.accent};
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  line-height: 1.4;
  margin-bottom: 0.2rem;
  text-transform: uppercase;

  span {
    font-size: 0.78rem;
    line-height: 1;
  }
`;

const ActivityTitle = styled.h3`
  color: ${theme.colors.heading};
  font-size: 0.92rem;
  line-height: 1.45;
`;

const ActivityDescription = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 0.78rem;
  line-height: 1.55;
  margin-top: 0.15rem;
`;

export const HomePage = () => {
  return (
    <PageShell>
      <Sidebar id="contact" aria-label="프로필, 학력, 기술 및 연락처">
        <ProfileFrame>
          <ProfileImage
            src={profilePhoto}
            alt="황효은 프로필 사진"
          />
        </ProfileFrame>
        <Name>Hyoeun Hwang</Name>
        <Role>Backend Developer</Role>

        <SidebarSection aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          <ResumeList>
            {educationItems.map((item) => (
              <ResumeItem key={`${item.label}-${item.period}`}>
                <strong>{item.label}</strong>
                <ResumePeriod>{item.period}</ResumePeriod>
                <ResumeNote>{item.note}</ResumeNote>
              </ResumeItem>
            ))}
          </ResumeList>
        </SidebarSection>

        <SidebarSection aria-labelledby="skills-title">
          <h2 id="skills-title">Skills</h2>
          {skillGroups.map((group) => (
            <SkillGroup key={group.label}>
              <SkillGroupTitle>{group.label}</SkillGroupTitle>
              <SkillText>{group.items.join(' · ')}</SkillText>
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
                aria-label={link.label}
                title={link.label}
              >
                {link.icon}
              </ContactLink>
            ))}
          </ContactList>
        </SidebarSection>
      </Sidebar>

      <ContentColumn>
        <IntroSection id="about" aria-label="황효은 소개">
          <Eyebrow>Backend Developer</Eyebrow>
          <IntroTitle>{aboutContent.title}</IntroTitle>
          <IntroText>
            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </IntroText>
        </IntroSection>

        <ExperienceSection id="experience" aria-label="My Works">
          <SectionHeader>
            <Eyebrow>Selected Projects</Eyebrow>
            <SectionTitle>My Works</SectionTitle>
          </SectionHeader>

          {featuredPosts.length === 0 ? (
            <EmptyState>등록된 프로젝트가 없습니다.</EmptyState>
          ) : (
            <CareerList>
              {featuredPosts.map((project) => (
                <CareerItem key={project.slug}>
                  <CareerMeta>
                    <CareerPeriod>{project.period || project.formattedDate}</CareerPeriod>
                    {project.affiliation ? <p>{project.affiliation}</p> : null}
                    {project.teamSize ? <p>{project.teamSize}</p> : null}
                  </CareerMeta>
                  <CareerBody>
                    <CareerContent>
                      {project.coverImage ? (
                        <CareerThumbnail
                          src={project.coverImage}
                          alt={`${project.title} 화면`}
                          loading="lazy"
                        />
                      ) : null}
                      <CareerDetails>
                        <CareerTitle>{project.title}</CareerTitle>
                        <CareerSummary>{project.summary}</CareerSummary>
                        {project.highlights.length > 0 ? (
                          <HighlightList>
                            {project.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </HighlightList>
                        ) : null}
                        {project.techStack.length > 0 ? (
                          <TechList>{project.techStack.join(' · ')}</TechList>
                        ) : null}
                      </CareerDetails>
                      <WorksLink
                        href={buildPostHref(project.slug)}
                        aria-label={`${project.title} 상세 페이지로 이동`}
                      >
                        <span>Detail</span>
                        <FaArrowRight aria-hidden="true" />
                      </WorksLink>
                    </CareerContent>
                  </CareerBody>
                </CareerItem>
              ))}
            </CareerList>
          )}
        </ExperienceSection>

        <ActivitiesSection id="activities" aria-label="활동 및 수상 경력">
          <SectionHeader>
            <Eyebrow>Beyond Projects</Eyebrow>
          </SectionHeader>
          <ActivityColumns>
            <ActivityColumn $divided>
              <ActivityColumnTitle>Activities</ActivityColumnTitle>
              <ActivityList>
                {activityItems.map((item) => (
                  <ActivityItem key={`${item.period}-${item.title}-${item.description}`}>
                    <ActivityPeriod>{item.period}</ActivityPeriod>
                    <ActivityBody>
                      <ActivityType>
                        <span aria-hidden="true">{item.icon}</span>
                        {item.category}
                      </ActivityType>
                      <ActivityTitle>{item.title}</ActivityTitle>
                      <ActivityDescription>{item.description}</ActivityDescription>
                    </ActivityBody>
                  </ActivityItem>
                ))}
              </ActivityList>
            </ActivityColumn>
            <ActivityColumn>
              <ActivityColumnTitle>Awards</ActivityColumnTitle>
              <ActivityList>
                {awardItems.map((item) => (
                  <ActivityItem key={`${item.period}-${item.title}-${item.description}`}>
                    <ActivityPeriod>{item.period}</ActivityPeriod>
                    <ActivityBody>
                      <ActivityType>
                        <span aria-hidden="true">{item.icon}</span>
                        {item.category}
                      </ActivityType>
                      <ActivityTitle>{item.title}</ActivityTitle>
                      <ActivityDescription>{item.description}</ActivityDescription>
                    </ActivityBody>
                  </ActivityItem>
                ))}
              </ActivityList>
            </ActivityColumn>
          </ActivityColumns>
        </ActivitiesSection>
      </ContentColumn>
    </PageShell>
  );
};

function parseAboutMarkdown(markdown: string): AboutContent {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const title = lines.find((line) => line.startsWith('# '))?.replace(/^#\s+/, '').trim() || '';
  const introSection = extractSection(lines, '소개');

  return {
    title,
    paragraphs: collectParagraphs(introSection),
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
