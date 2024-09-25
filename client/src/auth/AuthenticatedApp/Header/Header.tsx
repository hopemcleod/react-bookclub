import { FC } from "react";
import {
  ComponentPropsBase,
  HelixPalette,
  Tooltip,
} from "helix";
import { Box } from "@mui/material";
import { icons } from "../../../icons";
import { HeaderMenuButton } from "./Header.components";
import HeaderMenu from "./HeaderMenu";
import YourWork from "./YourWork";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";
import HeaderMenuColumn from "./HeaderMenuColumn";
import HeaderMenuItem from "./HeaderMenuItem";

/**
 * Props interface for Header.
 */
export interface HeaderProps extends ComponentPropsBase {
  /**
   * The app mode.
   */
  mode: "admin" | "nonAdmin";
}

const Header: FC<HeaderProps> = ({ dataId, style }) => {
  const renderMeetings = () => {
    return (
      <HeaderMenu dataId={`${dataId}-meetings`} id="meetings" label="Meetings">
        <HeaderMenuColumn dataId={`${dataId}-meeting-1`}>
          <HeaderMenuItem
            dataId={`${dataId}-meetings`}
            description="A register of current, future, and past book club meetings."
            icon="Calendar"
            label="Meetings"
            jumboTron
            url="/meetings"
          />
        </HeaderMenuColumn>
      </HeaderMenu>
    );
  };

  const renderBooks = () => {
    return (
      <HeaderMenu dataId={`${dataId}-books`} id="books" label="Books">
        <HeaderMenuColumn dataId={`${dataId}-books-1`}>
          <HeaderMenuItem
            dataId={`${dataId}-books`}
            description="A register of books for book club."
            icon="Calendar"
            label="Books"
            jumboTron
            url="/library"
          />
        </HeaderMenuColumn>
      </HeaderMenu>
    );
  };

  const navigate = useNavigate();
  // const { isAdmin } = useUserContext();

  /**
   * Renders the Audit menu.
   * @returns The HeaderMenu.
   */
  const renderMenu = () => {
    return (
      <>
        {renderMeetings()}
        {renderBooks()}
      </>
    );
  };

  return (
    <Box
      data-id={dataId}
      alignItems="flex-end"
      bgcolor={HelixPalette.white}
      borderBottom={`1px solid ${HelixPalette.neutral20}`}
      display="flex"
      height={72}
      width="100%"
      sx={style}
    >
      <Box alignItems="flex-end" display="flex" flex={1} marginRight="1rem">
        <Tooltip title="Home">
          <HeaderMenuButton
            onClick={() => navigate("/home")}
            sx={{
              alignItems: "center",
              borderRadius: "0.5rem",
              display: "flex",
              height: 48,
              justifyContent: "center",
              marginRight: "0.5rem",
              p: 0,
              width: 48,
            }}
          >
            {icons("Home", { size: 40 })}
          </HeaderMenuButton>
        </Tooltip>
        <HeaderMenu
          dataId={`${dataId}-your-work`}
          id="your-work"
          label="Your Work"
          menuStyle={{ height: "fit-content", minWidth: 600 }}
          onRenderMenu={() => <YourWork />}
        />
        {renderMenu()}
      </Box>
      <img
        data-id={`${dataId}-logo`}
        alt=""
        height={48}
        src={Logo}
      />
    </Box>
  );
};

export default Header;
