import { OAuthTokenFile } from './auth';

export interface SchwabClientOptions {
  loginId: string;
  password: string;
  totpSecret: string;
  appKey: string;
  appSecret: string;
  callbackUrl: string;
  tokensFilePath?: string;
  timeoutMs?: number;
  enableLogging?: boolean;
  autoRefreshTokens?: boolean;
  onRefresh?: (tokenFile: OAuthTokenFile) => void;
}
