import { FC, PropsWithChildren } from 'react';
import { ComponentPropsBase, Divider } from 'helix';
import { HeaderMenuUL } from './Header.components';

/**
 * Props interface for HeaderMenuColumn.
 */
export interface HeaderMenuColumnProps extends ComponentPropsBase {
  /**
   * True if this is the last column.
   * If true a right hand Divider is not rendered.
   */
  last?: boolean;
}

/**
 * A single column of menu items in a HeaderMenu Dropdown.
 */
export const HeaderMenuColumn: FC<PropsWithChildren<HeaderMenuColumnProps>> = ({ children, dataId, last = false, style }) => {
  return (
    <>
      <HeaderMenuUL data-id={dataId} sx={style}>
        {children}
      </HeaderMenuUL>
      {!last && <Divider margin="0 1rem" orientation="vertical" />}
    </>
  );
};

export default HeaderMenuColumn;
