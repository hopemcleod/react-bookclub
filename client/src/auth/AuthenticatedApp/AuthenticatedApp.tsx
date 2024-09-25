import { useEffect, useReducer, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Box, Button, Divider as MuiDivider, Typography } from "@mui/material";
import {
  Button as HelixButton,
  HelixApp,
  HelixPalette,
  HelixStyles,
  Homebar,
  IUsers,
  Modal,
  ConfirmationModal,
  DeleteModal,
  Snackbar,
} from "helix";
import {
  HelpMenuButton,
  HelpMenuLI,
  HelpMenuUL,
  SnackbarButton,
} from "./AuthenticatedApp.components";
import Header from "./Header/Header";
import { UIContextState } from "../../components/UIContext/UIContext.types";
import { UserContext } from "../components/UserContext/UserContext";
import {
  ABOUT_MODAL_ADDRESS,
  API_DEV_PLATFORM_URL,
  IS_PRODUCTION,
  LOGOUT_URL,
  PORT,
  USER_SESSION_KEY,
} from "../constants";
import { icons } from "../../icons";
import { User } from "../../modules/authorization/types";
import { formatDate } from "../../utilities/date";

export const AuthenticatedApp = () => {
  const ignore = true;
  if (ignore) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // eventually create a function that will return if the user is logged in or not
    const [currentUser, setCurrentUser] = useState<User>({
      email: "",
      id: undefined,
      isAdmin: false,
      firstName: "",
      lastName: "",
      isLoggedIn: false
    });
    const [showAboutModal, setShowAboutModal] = useState(false);

    // ****************************************************** UI CONTEXT ***************************************************
    /**
     * Default state for the provider.
     */
    const defaultState: UIContextState = {
      confirmModal: undefined,
      deleteModal: undefined,
      masked: false,
      showConfirmationModal: false,
      showDeleteModal: false,
      showSnackbar: false,
      snackbar: undefined,
      title: "",
    };

    // The context state reducer.
    const [state, setState] = useReducer(
      (state: UIContextState, values: Partial<UIContextState>) => ({
        ...state,
        ...values,
      }),
      defaultState
    );

    /**
     * Check the permissions whenever the screen reloads if required (check flag in session).
     * This is subtly different to the useEffect based on [isLoggedIn] as it doesn't use the User from cache.
     */
    useEffect(() => {
        setCurrentUser(getFromSession());
    }, []);

    useEffect(() => {
      setIsLoggedIn(currentUser.isLoggedIn);
    }, [currentUser]);

    /**
     * Check the session for the user to avoid needless hits.
     * Once loaded, the user needs to logout and back in again if the profile or permissions need refreshing.
     * @returns User object or undefined if not found
     */
    const getFromSession = (): User => {
      const user = sessionStorage.getItem(USER_SESSION_KEY);
      if (user !== null) return JSON.parse(user);
      return {
        email: "",
        id: undefined,
        isAdmin: false,
        firstName: "",
        lastName: "",
        isLoggedIn: false
      };
    };

    /**
     * Renders either a modal, snackbar or the full screen loader.
     * @returns The JSX to render.
     */
    const renderUIContext = () => {
      const {
        confirmModal,
        deleteModal,
        showConfirmationModal,
        showDeleteModal,
        showSnackbar,
        snackbar,
      } = state;
      const id = `automation-ui-context-popup`;

      //Modals
      if (confirmModal) {
        return (
          <ConfirmationModal
            {...confirmModal}
            key={Math.random()}
            dataId={id}
            onCancel={() => setState({ showConfirmationModal: false })}
            open={showConfirmationModal}
          />
        );
      }

      if (deleteModal) {
        return (
          <DeleteModal
            deleteLabel="Yes, delete"
            {...deleteModal}
            key={Math.random()}
            dataId={id}
            onCancel={() => setState({ showDeleteModal: false })}
            open={showDeleteModal}
          />
        );
      }

      //Snackbar
      if (snackbar) {
        const { clickToViewUrl, message, type } = snackbar;
        return (
          <Snackbar
            dataId={id}
            content={
              clickToViewUrl
                ? (textColor: string) => (
                    <Box>
                      <Typography
                        {...HelixStyles.style_07}
                        data-id={`${id}-message`}
                        color={textColor}
                        mb="0.5rem"
                        width="100%"
                      >
                        {message}
                      </Typography>
                      <SnackbarButton
                        data-id={`${id}-link`}
                        onClick={() => setState({ showSnackbar: false })}
                        to={clickToViewUrl}
                      >
                        Click here to view
                      </SnackbarButton>
                    </Box>
                  )
                : undefined
            }
            message={message}
            open={showSnackbar}
            onClose={() => setState({ showSnackbar: false })}
            type={type}
          />
        );
      }

      return null;
    };

    /**
     * Renders help's about modal to display about information.
     * @returns About modal.
     */
    const renderAboutModal = () => {
      const dataIdPrefix = "help-about-modal";

      return (
        <Modal
          dataId={dataIdPrefix}
          open={showAboutModal}
          style={{
            minHeight: 300,
            padding: 0,
            position: "relative",
            width: 400,
          }}
        >
          <Box
            data-id={`${dataIdPrefix}-header`}
            style={{
              alignItems: "center",
              backgroundColor: HelixPalette.neutral05,
              display: "flex",
              height: 64,
              justifyContent: "space-between",
              minHeight: 64,
              padding: "1rem 1.5rem",
            }}
          >
            <Typography
              {...HelixStyles.style_02}
              data-id={`${dataIdPrefix}-header-title`}
              component="h1"
              whiteSpace="nowrap"
            >
              About
            </Typography>
            <HelixButton
              dataId={`${dataIdPrefix}-close`}
              icon={icons("Cross")}
              label="Close"
              onClick={() => setShowAboutModal(false)}
              variant="icon"
            />
          </Box>
          <Typography
            {...HelixStyles.style_03}
            data-id={`${dataIdPrefix}-copyright`}
            margin="0.75rem 1.5rem"
          >
            &copy; {`Copyright ${new Date().getFullYear()}`}
          </Typography>
          {ABOUT_MODAL_ADDRESS.map((line, key) => (
            <Typography
              {...HelixStyles.textBase}
              key={key}
              data-id={`${dataIdPrefix}-line-${key}`}
              margin="0.125rem 1.5rem"
            >
              {line}
            </Typography>
          ))}
          <Box
            alignItems="center"
            display="flex"
            justifyContent="flex-end"
            p="1rem 1.5rem"
          >
            <HelixButton
              dataId={`${dataIdPrefix}-close`}
              label="Close"
              onClick={() => setShowAboutModal(false)}
              theme="secondary"
            />
          </Box>
        </Modal>
      );
    };

    /**
     * Builds the array of products to show on a homebar, user management is temporary.
     * @returns The products to show.
     */
    const buildProducts = () => {
      if (currentUser?.isAdmin) {
        return [
          {
            current: false,
            id: "user-management",
            icon: (
              <>
                <Button
                  onClick={() =>
                    window.open(
                      IS_PRODUCTION
                        ? `ui-auto-training-app.ebms.co/user-management`
                        : `${API_DEV_PLATFORM_URL}:${PORT}/user-management`,
                      "_blank"
                    )
                  }
                >
                  <IUsers />
                </Button>
              </>
            ),
            name: "User Management",
            url: "#",
          },
        ];
      }

      return [];
    };

    return (
      <HelixApp>
        {isLoggedIn && (
          <Box
            {...HelixStyles.style_06}
            data-id="automation-authorised-layout"
            display="flex"
            flexDirection="column"
            height="100vh"
            overflow="hidden"
          >
            <UserContext.Provider value={currentUser}>
              <nav>
                <Homebar
                  dataId="automation-homebar"
                  homeUrl=""
                  lastLogin={formatDate(new Date())}
                  onLogout={() => window.location.assign(LOGOUT_URL)}
                  products={buildProducts()} // prop name not really ideal for this app (as no products) but it's the only way can add extra menu items e.g. Admin/User Management
                  help={
                    <Box pt="0.5rem">
                      <Typography
                        data-id="automation-homebar-help-header"
                        {...HelixStyles.style_01}
                        color={HelixPalette.white}
                        letterSpacing={-0.4}
                      >
                        Help & Support
                      </Typography>
                      <MuiDivider
                        sx={{
                          borderColor: HelixPalette.white,
                          borderBottomWidth: "0.125rem",
                          margin: "1rem 0",
                          width: "100%",
                        }}
                      />
                      <HelpMenuUL>
                        <HelpMenuLI>
                          <Link
                            data-id="automation-homebar-help-terms-of-use-link"
                            to=""
                            target="_blank"
                          >
                            {icons("Checkboard")}
                            <Typography data-id="automation-homebar-help-terms-of-use-label">
                              Terms of use
                            </Typography>
                          </Link>
                        </HelpMenuLI>
                        <HelpMenuLI>
                          <Link
                            data-id="automation-homebar-help-privacy-policy-link"
                            to=""
                            target="_blank"
                          >
                            {icons("Lock")}
                            <Typography data-id="automation-homebar-help-privacy-policy-label">
                              Privacy policy
                            </Typography>
                          </Link>
                        </HelpMenuLI>
                        <HelpMenuLI>
                          <Link
                            data-id="automation-homebar-help-contact-us-link"
                            to=""
                            target="_blank"
                          >
                            {icons("Chat")}
                            <Typography data-id="automation-homebar-help-contact-us-label">
                              Contact us
                            </Typography>
                          </Link>
                        </HelpMenuLI>
                        <li>
                          <HelpMenuButton
                            onClick={() => setShowAboutModal(true)}
                          >
                            {icons("Question")}
                            <Typography data-id="automation-homebar-help-about-label">
                              About
                            </Typography>
                          </HelpMenuButton>
                        </li>
                      </HelpMenuUL>
                    </Box>
                  }
                  user={`${currentUser?.firstName} ${currentUser?.lastName}`}
                />
              </nav>
              <Box width="100%">
                <nav>
                  <Header
                    dataId="automation-frame-header"
                    mode="admin"
                    style={{ padding: "0 2rem 0.25rem 88px", zIndex: 2 }}
                  />
                </nav>
                <main>
                  <Box
                    data-id="automation-frame-content"
                    height="calc(100vh - 72px)"
                    onScroll={() => window.dispatchEvent(new Event("scroll"))}
                    overflow="auto"
                    pl="72px"
                  >
                    <Outlet />
                  </Box>
                </main>
              </Box>
            </UserContext.Provider>
            {renderUIContext()}
            {renderAboutModal()}

            {/* {state.masked && (
                  <Box
                    data-id="automation-frame-mask"
                    alignItems="center"
                    display="flex"
                    height="100vh"
                    justifyContent="center"
                    left={0}
                    position="fixed"
                    top={0}
                    width="100%"
                    sx={{ backgroundColor: "rgba(255,255,255,0.5)", zIndex: 99999 }}
                  >
                    <CubeLoader dataId="automation-frame-mask" />
                  </Box>
                )} */}
          </Box>
        )}
      </HelixApp>
    );
  }
};

export default AuthenticatedApp;
