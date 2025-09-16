/**
 * Supported OAuth flow types
 */
export enum OAuthTokenGrantTypeEnum {
  AuthorizationCode = 'authorization_code',
  RefreshToken = 'refresh_token',
}

/**
 * Options required to request an OAuth token
 */
export interface OAuthTokenRequestOptions {
  grantType: OAuthTokenGrantTypeEnum;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  refreshToken?: string;
  authorizationCode?: string;
}

/**
 * Standard response from an OAuth2 server when requesting a token
 */
export interface OAuthTokenResponse {
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
  access_token: string;
  id_token: string;
}

/**
 * Disk representation of the saved token
 */
export interface OAuthTokenFile {
  createdAt: string;
  refreshedAt: string;
  token: OAuthTokenResponse;
}
