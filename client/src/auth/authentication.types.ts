import { User } from '../modules/authorization/types'

/**
 * Storage of user information.
 */
export interface IUserContext {
  /**
   * User profile including permissions
   */
  user: User;
}