export const theme = {
  colors: {
    primary: '#0F172A',
    secondary: '#1E293B',
    accent: '#38BDF8',
    light: '#E2E8F0',
    text: '#E2E8F0',
    textLight: '#E2E8F0',
    textDark: '#0F172A',
    glass: {
      background: 'rgba(15, 23, 42, 0.72)',
      border: 'rgba(226, 232, 240, 0.12)',
      card: 'rgba(30, 41, 59, 0.78)',
    },
    gradient: {
      main: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      accent: 'linear-gradient(135deg, #38BDF8 0%, #E2E8F0 100%)',
      glass: 'linear-gradient(135deg, rgba(56, 189, 248, 0.18) 0%, rgba(226, 232, 240, 0.08) 100%)',
    },
    overlay: {
      light: 'rgba(226, 232, 240, 0.1)',
      dark: 'rgba(15, 23, 42, 0.35)',
    }
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },
  transitions: {
    default: '0.3s ease',
  },
};

export type Theme = typeof theme;
