import axios, { AxiosError, AxiosInstance } from 'axios';
import { AuthAPI, TraderAPI } from './modules';
import {
  LogLevel,
  OAuthTokenFile,
  OAuthTokenGrantTypeEnum,
  OAuthTokenResponse,
  SchwabClientOptions,
} from './types';
import { AuthScraper, Logger, TokenStorage } from './utils';

export class SchwabClient {
  private axios: AxiosInstance;
  private readonly baseApiUrl: string = 'https://api.schwabapi.com';

  private accessToken: string = '';
  private refreshToken: string = '';
  private accessTokenExpiresInMs: number = 0;
  private tokenCreatedAt: number = 0;
  private tokenRefreshedAt: number = 0;
  private autoRefreshTokens: boolean = true;
  private refreshTimer?: NodeJS.Timeout;

  private readonly loginId: string;
  private readonly password: string;
  private readonly totpSecret: string;
  private readonly appKey: string;
  private readonly appSecret: string;
  public readonly callbackUrl: string;
  private readonly refreshMarginMs = 5 * 60 * 1000;

  private readonly logger: Logger;
  private readonly tokenStorage: TokenStorage;
  private readonly authScraper: AuthScraper;

  private auth: AuthAPI;
  public trader: TraderAPI;

  private constructor(options: SchwabClientOptions) {
    this.validateOptions(options);
    this.loginId = options.loginId;
    this.password = options.password;
    this.totpSecret = options.totpSecret;
    this.appKey = options.appKey;
    this.appSecret = options.appSecret;
    this.callbackUrl = options.callbackUrl;

    this.axios = axios.create({
      baseURL: this.baseApiUrl,
      timeout: options.timeoutMs ?? 5000,
    });

    this.logger = new Logger(options.enableLogging ?? false);
    this.tokenStorage = new TokenStorage(options.tokensFilePath ?? './tokens.json', this.logger);
    this.authScraper = new AuthScraper({
      baseUrl: this.baseApiUrl,
      loginId: this.loginId,
      password: this.password,
      totpSecret: this.totpSecret,
      appKey: this.appKey,
      callbackUrl: this.callbackUrl,
      logger: this.logger,
    });

    this.auth = new AuthAPI(this.axios);
    this.trader = new TraderAPI(this.axios);
  }

  public static async init(options: SchwabClientOptions) {
    const client = new SchwabClient(options);
    await client.initializeTokens();
    client.logger.log(LogLevel.Info, 'Schwab client initialized');
    return client;
  }

  private validateOptions(options: SchwabClientOptions) {
    if (!options.loginId || typeof options.loginId !== 'string') {
      throw new Error('loginId is required and must be a string');
    }
    if (!options.password || typeof options.password !== 'string') {
      throw new Error('password is required and must be a string');
    }
    if (!options.totpSecret || typeof options.totpSecret !== 'string') {
      throw new Error('totpSecret is required and must be a string');
    }
    if (!options.appKey || typeof options.appKey !== 'string') {
      throw new Error('appKey is required and must be a string');
    }
    if (!options.appSecret || typeof options.appSecret !== 'string') {
      throw new Error('appSecret is required and must be a string');
    }
    if (
      !options.callbackUrl ||
      typeof options.callbackUrl !== 'string' ||
      !/^https?:\/\//.test(options.callbackUrl)
    ) {
      throw new Error('callbackUrl is required and must be a valid URL');
    }
    if (options.tokensFilePath !== undefined && typeof options.tokensFilePath !== 'string') {
      throw new Error('tokensFilePath must be a string if provided');
    }
    if (
      options.timeoutMs !== undefined &&
      (typeof options.timeoutMs !== 'number' || options.timeoutMs <= 0)
    ) {
      throw new Error('timeoutMs must be a positive number if provided');
    }
    if (options.enableLogging !== undefined && typeof options.enableLogging !== 'boolean') {
      throw new Error('enableLogging must be a boolean if provided');
    }
    if (options.autoRefreshTokens !== undefined && typeof options.autoRefreshTokens !== 'boolean') {
      throw new Error('autoRefreshTokens must be a boolean if provided');
    }
  }

  private async initializeTokens(): Promise<void> {
    const now = Date.now();
    this.logger.log(LogLevel.Info, `Loading tokens (now: ${new Date(now).toISOString()})`);

    const storedTokens = await this.tokenStorage.read();
    if (storedTokens) {
      this.applyTokenFile(storedTokens);

      const refreshAt = this.tokenRefreshedAt + this.accessTokenExpiresInMs - this.refreshMarginMs;

      if (now >= refreshAt) {
        this.logger.log(LogLevel.Info, 'Access token expired, refreshing immediately');
        await this.requestTokenByRefreshToken();
      } else {
        const refreshIn = refreshAt - now;
        this.logger.log(
          LogLevel.Info,
          `Access token valid, scheduling refresh in ${refreshIn / 1000}s`,
        );
        this.scheduleTokenRefresh(refreshIn);
      }
    } else {
      this.logger.log(LogLevel.Warn, 'No tokens found, starting authorization code flow...');
      await this.requestTokenByAuthorizationCode();
    }
    this.setAuthorizationHeader(this.accessToken);
  }

  private setAuthorizationHeader(token: string) {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    this.logger.log(LogLevel.Info, 'Authorization header set');
  }

  private scheduleTokenRefresh(delayMs: number) {
    if (!this.autoRefreshTokens) return;

    if (this.refreshTimer) clearTimeout(this.refreshTimer);

    this.refreshTimer = setTimeout(async () => {
      this.logger.log(LogLevel.Info, 'Refreshing token automatically...');
      await this.requestTokenByRefreshToken();
    }, delayMs);
  }

  private async requestTokenByAuthorizationCode(): Promise<void> {
    const code = await this.authScraper.getAuthorizationCode();
    const tokenResponse = (
      await this.auth.requestOAuthToken({
        grantType: OAuthTokenGrantTypeEnum.AuthorizationCode,
        clientId: this.appKey,
        clientSecret: this.appSecret,
        redirectUri: this.callbackUrl,
        authorizationCode: code,
      })
    ).data as OAuthTokenResponse;

    this.logger.log(LogLevel.Info, 'Token obtained via Authorization Code');

    const tokenFile: OAuthTokenFile = {
      createdAt: new Date().toISOString(),
      refreshedAt: new Date().toISOString(),
      token: tokenResponse,
    };

    this.applyTokenFile(tokenFile);
    await this.tokenStorage.write(tokenFile);
    this.scheduleTokenRefresh(this.accessTokenExpiresInMs - this.refreshMarginMs);
  }

  private async requestTokenByRefreshToken(): Promise<void> {
    try {
      const tokenResponse = (
        await this.auth.requestOAuthToken({
          grantType: OAuthTokenGrantTypeEnum.RefreshToken,
          clientId: this.appKey,
          clientSecret: this.appSecret,
          redirectUri: this.callbackUrl,
          refreshToken: this.refreshToken,
        })
      ).data as OAuthTokenResponse;

      this.logger.log(LogLevel.Info, 'Token refreshed successfully');

      const tokenFile: OAuthTokenFile = {
        createdAt: new Date(this.tokenCreatedAt).toISOString(),
        refreshedAt: new Date().toISOString(),
        token: tokenResponse,
      };

      this.applyTokenFile(tokenFile);
      await this.tokenStorage.write(tokenFile);
      this.scheduleTokenRefresh(this.accessTokenExpiresInMs - this.refreshMarginMs);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        this.logger.log(
          LogLevel.Error,
          `${error.response.status} - ${JSON.stringify(error.response.data)}`,
        );
        this.logger.log(LogLevel.Warn, 'Falling back to Authorization Code flow...');
        await this.requestTokenByAuthorizationCode();
      } else {
        throw error;
      }
    }
  }

  private applyTokenFile(tokenFile: OAuthTokenFile): void {
    this.accessToken = tokenFile.token.access_token;
    this.refreshToken = tokenFile.token.refresh_token;
    this.accessTokenExpiresInMs = tokenFile.token.expires_in * 1000;
    this.tokenCreatedAt = new Date(tokenFile.createdAt).getTime();
    this.tokenRefreshedAt = new Date(tokenFile.refreshedAt).getTime();

    this.logger.log(LogLevel.Info, 'Tokens applied to memory');
  }
}
