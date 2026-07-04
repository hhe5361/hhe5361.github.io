import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { theme } from '../../styles/theme';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import type { NavigationLink } from '../../features/posts/types';

interface LayoutProps {
  children: ReactNode;
  navigationLinks?: NavigationLink[];
  logoHref?: string;
  enableKeyboardNavigation?: boolean;
}

const defaultNavigationLinks: NavigationLink[] = [
  { href: '#about', label: 'About', ariaLabel: 'About section' },
  { href: '#portfolio', label: 'Portfolio', ariaLabel: 'Portfolio section' },
  { href: '#contact', label: 'Contact', ariaLabel: 'Contact section' },
];

const LayoutWrapper = styled.div`
  @media print {
    background: white !important;
    color: black !important;
    
    * {
      color: black !important;
      text-shadow: none !important;
      box-shadow: none !important;
    }

    section {
      min-height: auto !important;
      padding: 2rem 0 !important;
      page-break-inside: avoid;
    }

    a[href]:after {
      content: " (" attr(href) ")";
      font-size: 0.8em;
    }
  }

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  background: transparent;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, rgba(185, 28, 28, 0.04), transparent 40%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Header = styled.header`
  background: ${theme.colors.glass.background};
  border-bottom: 1px solid ${theme.colors.border};
  backdrop-filter: blur(12px);
  padding: ${theme.spacing.md} 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;

  @media print {
    display: none;
  }
`;

const Nav = styled.nav`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${theme.spacing.md};
    max-width: 1200px;
    margin: 0 auto;
    width: 90%;
  }
`;

const Logo = styled(motion.a)`
  color: ${theme.colors.heading};
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};

  a {
    color: ${theme.colors.text};
    transition: all ${theme.transitions.default};
    font-weight: 700;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: 4px;

    &:hover {
      color: ${theme.colors.accent};
      background-color: ${theme.colors.muted};
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.md};
  }
`;

const Main = styled.main`
  flex: 1;
  margin-top: 4.5rem;
  width: 100%;
  overflow-x: hidden;
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: ${theme.colors.accent};
  color: ${theme.colors.textDark};
  padding: ${theme.spacing.sm};
  z-index: 9999;
  transition: top 0.2s;

  &:focus {
    top: 0;
  }
`;

const Footer = styled.footer`
  background: ${theme.colors.surface};
  border-top: 1px solid ${theme.colors.border};
  color: ${theme.colors.textMuted};
  padding: ${theme.spacing.lg} 0;
  text-align: center;
  position: relative;
`;

export const Layout = ({
  children,
  navigationLinks = defaultNavigationLinks,
  logoHref = '#about',
  enableKeyboardNavigation = true,
}: LayoutProps) => {
  useKeyboardNavigation(enableKeyboardNavigation);

  useEffect(() => {
    if (!enableKeyboardNavigation) {
      return;
    }

    // Add keyboard navigation instructions to console
    console.info(
      'Keyboard Navigation:\n',
      '- Arrow Up/Down or PageUp/PageDown: Navigate between sections\n',
      '- Home: Go to top\n',
      '- End: Go to bottom'
    );
  }, [enableKeyboardNavigation]);

  return (
    <LayoutWrapper>
      <SkipLink href="#main-content">
        Skip to main content
      </SkipLink>

      <Header role="banner">
        <Nav role="navigation" aria-label="Main navigation">
          <div className="container">
            <Logo
              href={logoHref}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              aria-label="Go to portfolio home"
            >
              Hyoeun Hwang
            </Logo>
            <NavLinks role="list">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  role="listitem"
                  aria-label={link.ariaLabel}
                >
                  {link.label}
                </a>
              ))}
            </NavLinks>
          </div>
        </Nav>
      </Header>
      <Main id="main-content" role="main" tabIndex={-1}>
        {children}
      </Main>
      <Footer role="contentinfo">
        <div className="container">
          <p>© {new Date().getFullYear()} Hyoeun Hwang. All rights reserved.</p>
        </div>
      </Footer>
    </LayoutWrapper>
  );
};
