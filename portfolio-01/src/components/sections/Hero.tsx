import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { keyframes } from '@emotion/react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import profilePlaceholder from '../../assets/profile-placeholder.svg';

const HeroSection = styled.section`
  min-height: calc(100vh - 4.5rem);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: ${theme.colors.textLight};
  padding: ${theme.spacing.lg} 0;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    width: 95%;
    
    @media (min-width: ${theme.breakpoints.sm}) {
      width: 90%;
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1120px;
  width: 100%;
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  border-radius: 28px;
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.glass.border};
  box-shadow:
    0 24px 70px rgba(15, 23, 42, 0.24),
    inset 0 1px 0 rgba(226, 232, 240, 0.04);

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }
`;

const HeroGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.xl};
  align-items: center;

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
    gap: calc(${theme.spacing.xl} * 1.1);
  }
`;

const CopyColumn = styled.div`
  min-width: 0;
`;

const fadeUpKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Title = styled.h1`
  animation: ${fadeUpKeyframes} 0.5s ease-out forwards;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.light};
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-wrap: balance;
`;

const Subtitle = styled.h2`
  animation: ${fadeUpKeyframes} 0.5s ease-out 0.2s forwards;
  opacity: 0;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  margin-bottom: ${theme.spacing.lg};
  opacity: 0.9;
  font-weight: 500;
`;

const Description = styled.p`
  animation: ${fadeUpKeyframes} 0.5s ease-out 0.4s forwards;
  opacity: 0;
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  max-width: 600px;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.8;
  line-height: 1.7;
`;

const SocialLinks = styled.div`
  animation: ${fadeUpKeyframes} 0.5s ease-out 0.6s forwards;
  opacity: 0;
  display: flex;
  gap: ${theme.spacing.md};
  
  a {
    color: ${theme.colors.textLight};
    font-size: 1.5rem;
    transition: all ${theme.transitions.default};
    padding: ${theme.spacing.xs};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.glass.background};
    
    &:hover {
      color: ${theme.colors.light};
      transform: translateY(-3px);
      background: ${theme.colors.glass.card};
      box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
    }
  }

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.lg};
    
    a {
      font-size: 1.75rem;
    }
  }
`;

const VisualColumn = styled.div`
  width: min(100%, 390px);
  margin: 0 auto;
`;

const ProfileImageFrame = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 24px;
  overflow: hidden;
  background: ${theme.colors.gradient.main};
  border: 1px solid ${theme.colors.glass.border};
  box-shadow:
    0 20px 45px rgba(15, 23, 42, 0.28),
    inset 0 1px 0 rgba(226, 232, 240, 0.05);
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const profileImageSrc = profilePlaceholder;

export const Hero = () => {
  return (
    <HeroSection id="about" role="region" aria-label="About me">
      <div className="container">
        <HeroContent>
          <HeroGrid>
            <CopyColumn>
              <Title role="heading" aria-level={2}>
                Hi, I'm Hyoeun Hwang
              </Title>
              <Subtitle role="heading" aria-level={3}>
                Backend Developer
              </Subtitle>
              <Description role="paragraph">
                I create elegant solutions to complex problems, specializing in modern program development
                with a focus on user experience and clean code.
              </Description>
              <SocialLinks role="list" aria-label="Social media links">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit my GitHub profile"
                  role="listitem"
                >
                  <FaGithub aria-hidden="true" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit my LinkedIn profile"
                  role="listitem"
                >
                  <FaLinkedin aria-hidden="true" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a 
                  href="mailto:your.email@example.com"
                  aria-label="Send me an email"
                  role="listitem"
                >
                  <FaEnvelope aria-hidden="true" />
                  <span className="sr-only">Email</span>
                </a>
              </SocialLinks>
            </CopyColumn>
            <VisualColumn>
              <ProfileImageFrame>
                <ProfileImage
                  src={profileImageSrc}
                  alt="Portrait placeholder for Hyoeun Hwang"
                />
              </ProfileImageFrame>
            </VisualColumn>
          </HeroGrid>
        </HeroContent>
      </div>
    </HeroSection>
  );
};
