export interface AuthenticationResponse {
  message: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_type: number;
  };
}

export type Credentials = {
  email: string;
  password: string;
};
