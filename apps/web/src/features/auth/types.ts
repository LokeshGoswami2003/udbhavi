export type AuthUser = {
  id: string;
  email: string;
  plan: string;
  status: string;
};

export type AuthTokensResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: AuthUser;
};

export type AuthSessionResponse = {
  user: AuthUser;
  profile_onboarding_status: string;
};

export type StoredAuthSession = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};
