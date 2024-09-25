import { HelixPalette } from 'helix';
import { styled } from '@mui/material';

/**
 * Styled ul for the recently viewed list.
 */
export const RecentlyViewedList = styled('ul')(() => ({
  listStyle: 'none',
  overflow: 'hidden',
  margin: 0,
  padding: 0,
}));

/**
 * Styled li for a recently viewed list item.
 */
export const RecentlyViewedListItem = styled('li')(() => ({
  alignItems: 'center',
  display: 'flex',
  height: 36,
  ':not(:last-of-type)': {
    borderBottom: `1px solid ${HelixPalette.neutral05}`,
  },
}));
