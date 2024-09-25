import { Outlet, Route, Routes } from 'react-router-dom';
import { Home } from './routes/Home/Home.tsx'
import { HttpErrorWrapper } from '../components/Error/HttpErrorWrapper.tsx'

/**
 * The URL prefix for all Home module routes.
 * Use in the Navigation configs and any `<Link>` components.
 */
export const HOME_URL_PREFIX = 'home'; // This will need the module suffix adding if this ever has its own API

/**
 * Contains the routing for the Home module.
 * @returns Routes collection
 */
export const HomeApp = () => {
  /* The HOME_URL_PREFIX is not needed here in the routes - it is implied due to the hierarchy structure */
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* 404 */}
        <Route path="*" element={<HttpErrorWrapper code="404" />} />
      </Routes>
      {/* Renderer */}
      <Outlet />
    </>
  );
};

export default HomeApp;