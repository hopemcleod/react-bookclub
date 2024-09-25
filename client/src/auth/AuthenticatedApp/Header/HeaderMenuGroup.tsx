import { FC, PropsWithChildren } from 'react';
import { HeaderMenuGroupLI, HeaderMenuUL } from './Header.components';

/**
 * Props interface for HeaderMenuGroup.
 */
export interface HeaderMenuGroupProps {
  /**
   * Prefix for all data-ids.
   */
  dataId: string;
  /**
   * The group header.
   */
  header: string;
  /**
   * True if this the last group in the curent column.
   */
  last?: boolean;
}

/**
 * Inner menu grouping a set of menu items with a header.
 */
export const HeaderMenuGroup: FC<PropsWithChildren<HeaderMenuGroupProps>> = ({ children, dataId, header, last = false }) => {
  return (
    <HeaderMenuUL data-id={`${dataId}-group`} sx={{ marginBottom: last ? 0 : '1rem' }}>
      <HeaderMenuGroupLI data-id={`${dataId}-header`}>{header}</HeaderMenuGroupLI>
      {children}
    </HeaderMenuUL>
  );
};

export default HeaderMenuGroup;
