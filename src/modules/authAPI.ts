import { AxiosInstance } from 'axios';
import { BaseAPI } from './baseAPI';
import { OAuthTokenRequestOptions, OAuthTokenGrantTypeEnum } from '../types';

export class AuthAPI extends BaseAPI {
  constructor(private axios: AxiosInstance) {
    super();
  }
  public requestOAuthToken(options: OAuthTokenRequestOptions) {
    const headers = this.getAuthHeaders(options.clientId, options.clientSecret);
    const bodyParams = this.buildRequestBody(options);
    const parsedData = this.paramsParser(bodyParams);

    return this.axios.post('/v1/oauth/token', parsedData, { headers });
  }
  private buildRequestBody(options: OAuthTokenRequestOptions): Record<string, string> {
    switch (options.grantType) {
      case OAuthTokenGrantTypeEnum.RefreshToken:
        if (!options.refreshToken)
          throw new Error('refreshToken is required for RefreshToken grant');
        return {
          grant_type: options.grantType,
          refresh_token: options.refreshToken,
        };

      case OAuthTokenGrantTypeEnum.AuthorizationCode:
        if (!options.authorizationCode)
          throw new Error('authorizationCode is required for AuthorizationCode grant');
        if (!options.redirectUri)
          throw new Error('redirectUri is required for AuthorizationCode grant');
        return {
          grant_type: options.grantType,
          code: options.authorizationCode,
          redirect_uri: options.redirectUri,
        };

      default:
        throw new Error('Invalid OAuth token grant type');
    }
  }

  private getAuthHeaders(clientId: string, clientSecret: string) {
    const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    return {
      'Authorization': `Basic ${encoded}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }
}
