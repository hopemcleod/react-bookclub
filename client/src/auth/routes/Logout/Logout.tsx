import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { CubeLoader } from 'helix';
import { LOGIN_URL, USER_SESSION_KEY } from '../../constants';

/**
 * Component for handling the logout and callback from the OIDC provider.
 * This unloads the translations and redirects the user back to the login screen.
 * The OIDC provider handles failed logouts (in the unlikely even such a case arises).
 */
export const Logout = () => {
  // Hooks
  const navigate = useNavigate();

  /**
   * Ends the user's session and tidies up.
   */
  const performLogout = () => {
    sessionStorage.removeItem(USER_SESSION_KEY);
    navigate(LOGIN_URL, { replace: true });
    };

  /**
   * Logout
   */
  useEffect(() => {
    performLogout();
  });

  return (
    <Box
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CubeLoader dataId="logout-cube-loader" />
    </Box>
  );
};

export default Logout;