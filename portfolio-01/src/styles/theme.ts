export const theme = {
  colors: {
    primary: '#F6F7F4',
    secondary: '#DFE7E2',
    background: '#F6F7F4',
    surface: '#FFFFFF',
    muted: '#EEF2ED',
    border: 'rgba(31, 41, 55, 0.12)',
    borderStrong: 'rgba(31, 41, 55, 0.22)',
    accent: '#B91C1C',
    heading: '#111827',
    light: '#111827',
    text: '#374151',
    textMuted: '#6B7280',
    textLight: '#374151',
    textDark: '#FFFFFF',
    glass: {
      background: 'rgba(255, 255, 255, 0.88)',
      border: 'rgba(31, 41, 55, 0.12)',
      card: 'rgba(238, 242, 237, 0.9)',
    },
    gradient: {
      main: 'linear-gradient(135deg, #F6F7F4 0%, #FFFFFF 48%, #DFE7E2 100%)',
      accent: 'linear-gradient(135deg, #B91C1C 0%, #F97316 100%)',
      glass: 'linear-gradient(135deg, rgba(185, 28, 28, 0.1) 0%, rgba(31, 41, 55, 0.04) 100%)',
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.7)',
      dark: 'rgba(17, 24, 39, 0.2)',
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
