import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Logger } from './logger';
import { OAuthTokenFile, OAuthTokenResponse } from '../types';

export class TokenStorage {
  private filePath: string;
  private logger: Logger;

  constructor(filePath: string = './tokens.json', logger: Logger) {
    this.filePath = path.resolve(process.cwd(), filePath);
    this.logger = logger;
  }

  public async read(): Promise<OAuthTokenFile | null> {
    try {
      const data = await readFile(this.filePath, { encoding: 'utf-8' });
      const json: OAuthTokenFile = this.validateOAuthTokenFile(JSON.parse(data));
      this.logger.info(`Tokens loaded from ${this.filePath}`);
      return json;
    } catch (_error) {
      this.logger.warn(`Could not read tokens from ${this.filePath}`);
      return null;
    }
  }

  public async write(tokens: OAuthTokenFile): Promise<void> {
    try {
      const json = JSON.stringify(tokens, null, 2);
      await writeFile(this.filePath, json, { encoding: 'utf-8' });
      this.logger.info(`Tokens saved to ${this.filePath}`);
    } catch (error) {
      this.logger.error(`Failed to write tokens to ${this.filePath}`);
      throw error;
    }
  }

  private validateOAuthTokenFile(data: unknown): OAuthTokenFile {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Token file data must be a non-null object');
    }

    const d = data as Partial<OAuthTokenFile>;

    if (!d.createdAt || isNaN(Date.parse(d.createdAt))) {
      throw new Error('createdAt is required and must be a valid ISO date string');
    }

    if (!d.refreshedAt || isNaN(Date.parse(d.refreshedAt))) {
      throw new Error('refreshedAt is required and must be a valid ISO date string');
    }

    if (!d.token || typeof d.token !== 'object') {
      throw new Error('token is required and must be an object');
    }

    const t = d.token as Partial<OAuthTokenResponse>;

    const requiredTokenFields: (keyof OAuthTokenResponse)[] = [
      'access_token',
      'refresh_token',
      'expires_in',
      'token_type',
      'scope',
      'id_token',
    ];

    requiredTokenFields.forEach(field => {
      if (!(field in t)) {
        throw new Error(`token.${field} is required`);
      }
    });

    if (typeof t.access_token !== 'string') {
      throw new Error('token.access_token must be a string');
    }
    if (typeof t.refresh_token !== 'string') {
      throw new Error('token.refresh_token must be a string');
    }
    if (typeof t.expires_in !== 'number') {
      throw new Error('token.expires_in must be a number');
    }
    if (typeof t.token_type !== 'string') {
      throw new Error('token.token_type must be a string');
    }
    if (typeof t.scope !== 'string') {
      throw new Error('token.scope must be a string');
    }
    if (typeof t.id_token !== 'string') {
      throw new Error('token.id_token must be a string');
    }

    return d as OAuthTokenFile;
  }
}
