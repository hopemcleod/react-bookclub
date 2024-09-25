import { CSSProperties, FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ComponentPropsBase, Dropdown, HelixStyles } from 'helix';
import { HeaderMenuButton } from './Header.components';
import { HEADER_MENU_ITEM_ON_CLICK_EVENT } from './HeaderMenuItem';
import { icons } from '../../../icons';
import { useEventBus } from '../../../hooks';

/**
 * Props interface for HeaderMenu.
 */
export interface HeaderMenuProps extends ComponentPropsBase {
  /**
   * The menu id.
   */
  id: string;
  /**
   * The menu label.
   */
  label: string;
  /**
   * Styles applied to the menu Dropdown.
   */
  menuStyle?: CSSProperties;
  /**
   * Handler called to render the menu content.
   */
  onRenderMenu?: () => JSX.Element;
}

/**
 * Menu dropdown displayed in the Header.
 */
export const HeaderMenu: FC<PropsWithChildren<HeaderMenuProps>> = ({ children, dataId, id, label, menuStyle, onRenderMenu, style }) => {
  // Hooks.
  const { subscribe, unsubscribe } = useEventBus();

  // State.
  const [open, setOpen] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number>(screen.availHeight);

  // Constants.
  const events = [HEADER_MENU_ITEM_ON_CLICK_EVENT];

  // Refs.
  const menuRef = useRef<HTMLButtonElement>(null);

  // Hook into events.
  useEffect(() => {
    const onHandleEvent = () => setOpen(false);
    const onResize = () => setMaxHeight(screen.availHeight);

    window.addEventListener('resize', onResize);
    subscribe(events, onHandleEvent);
    return () => {
      window.removeEventListener('resize', onResize);
      unsubscribe(events, onHandleEvent);
    };
  }, []);

  return (
    <>
      <HeaderMenuButton
        ref={menuRef}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        data-id={`${dataId}-trigger`}
        role="combobox"
        id={id}
        onClick={() => setOpen(true)}
        sx={style}
      >
        <Typography {...HelixStyles.style_07} data-id={`${dataId}-label`} fontSize="1rem" mr="0.125rem">
          {label}
        </Typography>
        {open ? icons('ChevronUp') : icons('ChevronDown')}
      </HeaderMenuButton>
      <Dropdown
        dataId={`${dataId}-dropdown`}
        anchorEl={menuRef.current}
        id={`${dataId}-dropdown`}
        offset={[0, 5]}
        open={open}
        height={maxHeight}
        onClose={() => setOpen(false)}
        style={{
          boxShadow: HelixStyles.elevationLG,
          minWidth: menuRef?.current?.offsetWidth,
          height: 'fit-content',
          padding: '1rem',
          ...menuStyle,
        }}
      >
        {onRenderMenu?.() || <Box display="flex">{children}</Box>}
      </Dropdown>
    </>
  );
};

export default HeaderMenu;
