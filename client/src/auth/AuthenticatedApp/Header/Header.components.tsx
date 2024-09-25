import { styled } from '@mui/material';
import { HelixPalette, HelixStyles } from 'helix';

/**
 * Styled button for the menu trigger.
 */
export const HeaderMenuButton = styled('button')(() => ({
  alignItems: 'center',
  backgroundColor: HelixPalette.white,
  border: `2px solid ${HelixPalette.white}`,
  borderRadius: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  marginRight: '0.125rem',
  overflow: 'hidden',
  padding: '0.25rem 0 0.25rem 0.5rem',
  whiteSpace: 'nowrap',
  width: 'fit-content',
  '&:hover': { backgroundColor: HelixPalette.neutral05, borderColor: HelixPalette.neutral05, cursor: 'pointer' },
  '&:focus': { outline: 'none' },
  '&:active:focus': { backgroundColor: HelixPalette.neutral10, borderColor: HelixPalette.neutral10 },
  '&:focus-visible': { borderColor: HelixPalette.blue60 },
  '&[aria-expanded=true]': {
    backgroundColor: HelixPalette.neutral05,
    borderColor: HelixPalette.neutral05,
  },
}));

/**
 * Styled li for a menu item.
 */
export const HeaderMenuJumboLI = styled('li')(() => ({
  maxWidth: 500,
  a: {
    alignItems: 'flex-start',
    border: `2px solid ${HelixPalette.neutral10}`,
    borderRadius: '0.5rem',
    display: 'flex',
    padding: '0.5rem',
    textDecoration: 'none',
    width: '100%',
    '&:hover': { borderColor: HelixPalette.teal70 },
    '&:active:focus': { borderColor: HelixPalette.teal90 },
    '&:focus-visible': { borderColor: HelixPalette.blue60 },
  },
}));

/**
 * Styled li for a menu group item.
 */
export const HeaderMenuGroupLI = styled('li')(() => ({
  ...HelixStyles.style_07,
  fontWeight: 700,
}));

/**
 * Styled ul for a menu column.
 */
export const HeaderMenuUL = styled('ul')(() => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  'li:not(:last-of-type)': { marginBottom: '0.5rem' },
}));
