import { styled } from '@mui/material';
import { HelixPalette, HelixStyles } from 'helix';

/**
 * Styled ul for the my tasks list.
 */
export const MyTaskList = styled('ul')(() => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
}));

/**
 * Styled li for a my tasks list item.
 */
export const MyTaskListItem = styled('li')(() => ({
  ...HelixStyles.truncate,
  border: `2px solid ${HelixPalette.neutral10}`,
  borderRadius: '0.5rem',
  padding: '0.5rem',
  whiteSpace: 'nowrap',
}));
