import { createContext, useContext } from "react";
import { User } from "../../../modules/authorization/types";

const defaultProfile: User = {
  email: "",
  id: undefined,
  isAdmin: false,
  firstName: "",
  lastName: "",
  isLoggedIn: false
};

/**
 * A context for the logged in User.
 */
export const UserContext = createContext<User>(defaultProfile);

/**
 * Allows consumers to access logged in User .
 * @returns UserContext hooks
 */
export const useUserContext = () => useContext(UserContext);
