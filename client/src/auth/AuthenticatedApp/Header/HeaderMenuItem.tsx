import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { HelixStyles, Hyperlink } from 'helix';
import { HeaderMenuJumboLI } from './Header.components';
import { icons } from '../../../icons';
import { useEventBus } from '../../../hooks';

/**
 * Props interface for HeaderMenuItem.
 */
export type HeaderMenuItemProps = {
  /**
   * Prefix for all data-ids.
   */
  dataId: string;
  /**
   * The item description.
   */
  description?: string;
  /**
   * The item icon.
   * Jumbotron = true only.
   */
  icon?: string;
  /**
   * The item label.
   */
  label: string;
  /**
   * True to display the item as jumbotron.
   */
  jumboTron?: boolean;
  /**
   * The url to navigate too when the item is clicked.
   */
  url: string;
};

/**
 * Event fired when a menu item is clicked.
 */
export const HEADER_MENU_ITEM_ON_CLICK_EVENT = 'headerMenuItemOnClickEvent';

/**
 * A navigable item displayed in a HeaderMenu.
 */
export const HeaderMenuItem: FC<HeaderMenuItemProps> = ({ dataId, description, icon, label, jumboTron = false, url }) => {
  // Hooks.
  const { fireEvent } = useEventBus();

  /**
   * Handler called when the item is clicked.
   */
  const handleOnClick = () => fireEvent(HEADER_MENU_ITEM_ON_CLICK_EVENT);

  return !jumboTron ? (
    <li data-id={dataId}>
      <Hyperlink
        data-id={`${dataId}-link`}
        a={
          <Link data-id={`${dataId}-link`} onClick={handleOnClick} to={url}>
            {label}
          </Link>
        }
      />
    </li>
  ) : (
    <HeaderMenuJumboLI data-id={dataId}>
      <Link data-id={`${dataId}-link`} onClick={handleOnClick} to={url}>
        {icon && icons(icon, { size: 28, style: { marginRight: '0.5rem' } })}
        <Box>
          <Typography {...HelixStyles.textBase} fontWeight={700}>
            {label}
          </Typography>
          <Typography {...HelixStyles.textBase} fontSize="0.875rem" fontWeight={400}>
            {description}
          </Typography>
        </Box>
      </Link>
    </HeaderMenuJumboLI>
  );
};

export default HeaderMenuItem;
