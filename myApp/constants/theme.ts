// constants/theme.ts

export const THEME = {
  colors: {
    background: '#F8F9FB',
    card: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#717171',
    primary: '#000000',
    success: '#27AE60',
    danger: '#EB5757',
    border: '#E0E0E0',
    track: '#F2F2F2',
    accent: '#007AFF',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadius: {
    s: 8,
    m: 14,
    l: 24,
  },
  shadow: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    }
  }
};

// CRITICAL: This ensures 'import THEME from ...' works
export default THEME;