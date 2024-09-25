// Use this file to store any global constants for the module.
/**
 * Determins whether we are running in local development, or remote production mode.
 */
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const API_DEV_PLATFORM_URL = 'localhost';
export const PORT = '5173' // vite application
/**
 * Base key prefix for any auth session keys.
 */
const AUTH_BASE_SESSION_PREFIX = 'automation-user:';

/**
 * Caching the current user in session.
 */
export const USER_SESSION_KEY = `${AUTH_BASE_SESSION_PREFIX}current`;

export const LOGIN_URL = '/login';
export const LOGOUT_URL = '/logout';
export const DEFAULT_AUTH_OK_ROUTE = '/';

export const IS_LOGGED_IN_EVENT = 'isLoggedIn';

export const ABOUT_MODAL_ADDRESS = ['1 Mere Way', 'Ruddington Fields Business Park', 'Nottinghamshire', 'NG11 6JS', 'United Kingdom'];