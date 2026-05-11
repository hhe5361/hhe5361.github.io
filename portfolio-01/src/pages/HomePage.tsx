import { lazy, Suspense } from 'react';
import styled from '@emotion/styled';
import { Hero } from '../components/sections/Hero';
import { theme } from '../styles/theme';

const Projects = lazy(() => import('../components/sections/Projects'));
const Skills = lazy(() => import('../components/sections/Skills'));
const Contact = lazy(() => import('../components/sections/Contact'));

const LoadingFallback = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  color: ${theme.colors.accent};
  font-size: 1.2rem;

  @media print {
    display: none;
  }
`;

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingFallback>Loading projects...</LoadingFallback>}>
        <Projects />
      </Suspense>
      <Suspense fallback={<LoadingFallback>Loading skills...</LoadingFallback>}>
        <Skills />
      </Suspense>
      <Suspense fallback={<LoadingFallback>Loading contact...</LoadingFallback>}>
        <Contact />
      </Suspense>
    </>
  );
};
