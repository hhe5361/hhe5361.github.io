import { ThemeProvider } from '@emotion/react';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { getPostBySlug } from './features/posts/content';
import { PostDetailPage } from './features/posts/PostDetailPage';
import { buildHomeHref, getRequestedPostSlug } from './features/posts/routes';
import type { NavigationLink } from './features/posts/types';
import { HomePage } from './pages/HomePage';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

const detailNavigationLinks: NavigationLink[] = [
  { href: buildHomeHref('about'), label: '소개', ariaLabel: '소개로 이동' },
  { href: buildHomeHref('experience'), label: 'My Works', ariaLabel: 'My Works로 이동' },
  { href: buildHomeHref('contact'), label: '연락처', ariaLabel: '연락처로 이동' },
];

function App() {
  const requestedPostSlug = getRequestedPostSlug(window.location.search);
  const activePost = requestedPostSlug ? getPostBySlug(requestedPostSlug) : null;
  const isPostView = requestedPostSlug !== null;

  useEffect(() => {
    document.title = activePost ? `${activePost.title} | Portfolio` : 'Portfolio';
  }, [activePost]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout
        navigationLinks={isPostView ? detailNavigationLinks : undefined}
        logoHref={isPostView ? buildHomeHref('about') : '#about'}
        enableKeyboardNavigation={!isPostView}
      >
        {isPostView ? (
          <PostDetailPage
            post={activePost}
            requestedSlug={requestedPostSlug}
          />
        ) : (
          <HomePage />
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
