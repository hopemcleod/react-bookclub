import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import { HelixPalette, HelixStyles } from 'helix';

// Moved this out of AuthenticatedApp as Jest breaks whenever a component uses styled() from MUI and there is no fix!
// This allows us to mock any Styled components instead.

/**
 * Styled Link used in Snackbars.
 */
/* istanbul ignore next */
export const SnackbarButton = styled(Link)(() => ({
  ...HelixStyles.style_07,
  color: HelixPalette.white,
  '&:active:focus': { color: HelixPalette.neutral05 },
  '&:visited': { color: HelixPalette.white },
}));

/**
 * Styled ul for a help menu group.
 */
export const HelpMenuUL = styled('ul')(() => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  'li:not(:last-of-type)': { marginBottom: '0.75rem' },
}));

/**
 * Common styling for a help menu item.
 */
const HelpMenuItem = {
  alignItems: 'flex-start',
  backgroundColor: HelixPalette.teal80,
  borderRadius: '0.5rem',
  display: 'flex',
  gap: '0.5rem',
  padding: '0.5rem',
  textDecoration: 'none',
  width: '100%',
  '&:hover': { backgroundColor: HelixPalette.teal70 },
  '&:active:focus': { backgroundColor: HelixPalette.teal100 },
  p: { ...HelixStyles.style_03, color: HelixPalette.white, lineHeight: '1.5rem' },
  svg: { fill: HelixPalette.white },
};

/**
 * Styled li for a help menu link.
 */
export const HelpMenuLI = styled('li')(() => ({
  a: HelpMenuItem,
}));

/**
 * Styling for a help menu button.
 */
export const HelpMenuButton = styled('button')(() => ({
  ...HelpMenuItem,
  outline: 'none',
  border: 'none',
  '&:hover': { backgroundColor: HelixPalette.teal70, cursor: 'pointer' },
}));
