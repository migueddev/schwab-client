import puppeteer, { Browser, Page } from 'puppeteer';
import speakeasy from 'speakeasy';
import { Logger } from './logger';
import { PUPPETEER_TIMEOUT } from '../configs';

export interface AuthScraperOptions {
  baseUrl: string;
  appKey: string;
  callbackUrl: string;
  loginId: string;
  password: string;
  totpSecret: string;
  logger: Logger;
}

export class AuthScraper {
  private baseUrl: string;
  private appKey: string;
  private callbackUrl: string;
  private loginId: string;
  private password: string;
  private totpSecret: string;
  private logger: Logger;

  constructor(options: AuthScraperOptions) {
    this.baseUrl = options.baseUrl;
    this.appKey = options.appKey;
    this.callbackUrl = options.callbackUrl;
    this.loginId = options.loginId;
    this.password = options.password;
    this.totpSecret = options.totpSecret;
    this.logger = options.logger;
  }

  /**
   * Generates the 2FA code using the TOTP secret
   */
  private generate2FACode(): string {
    return speakeasy.totp({ secret: this.totpSecret, encoding: 'base32' });
  }

  /**
   * Extracts the authorization code from a redirect URL
   */
  private extractCode(url: string): string {
    const start = url.indexOf('code=') + 5;
    const end = url.indexOf('%40');

    if (start < 5 || end === -1) {
      throw new Error("URL does not contain a valid 'code=' parameter with '%40'");
    }

    return `${url.substring(start, end)}@`;
  }

  /**
   * Performs the web scraping to obtain the OAuth authorization code
   */
  public async getAuthorizationCode(): Promise<string> {
    this.logger.info('Starting Schwab web scraping for authorization code');

    let redirectUrl = '';
    let browser: Browser | null = null;

    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-blink-features=AutomationControlled',
          '--ignore-certificate-errors',
          '--disable-web-security',
          '--disable-features=SecureDNS,EnableDNSOverHTTPS',
        ],
      });

      const page: Page = await browser.newPage();
      page.setDefaultTimeout(PUPPETEER_TIMEOUT);
      page.setDefaultNavigationTimeout(PUPPETEER_TIMEOUT);
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      );

      // Prevent detection
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
      });

      const oauthUrl = `${this.baseUrl}/v1/oauth/authorize?client_id=${this.appKey}&redirect_uri=${this.callbackUrl}`;

      // Listen to requests to capture the redirect URL
      page.on('request', req => {
        const url = req.url();
        if (url.startsWith(this.callbackUrl)) {
          redirectUrl = url;
        }
      });

      // Go to login page
      await page.goto(oauthUrl, { waitUntil: 'load' });
      await page.waitForSelector('#loginIdInput', { visible: true });
      await page.type('#loginIdInput', this.loginId, { delay: 200 });
      await page.type('#passwordInput', this.password, { delay: 200 });
      await page.click('#btnLogin');

      // 2FA page
      await page.waitForNavigation({ waitUntil: 'load' });
      await page.waitForSelector('#placeholderCode', { visible: true });
      const code2FA = this.generate2FACode();
      await page.type('#placeholderCode', code2FA, { delay: 200 });
      await page.click('#continueButton');

      // Accept Terms and Conditions
      await page.waitForNavigation({ waitUntil: 'load' });
      await page.waitForSelector('#acceptTerms', { visible: true });
      await page.click('#acceptTerms');
      await page.click('#submit-btn');

      await page.waitForSelector('#agree-modal-btn-', { visible: true });
      await page.click('#agree-modal-btn-');

      // Accounts page
      await page.waitForNavigation({ waitUntil: 'load' });
      await page.waitForSelector("input[type='checkbox']", { visible: true });
      const accountsChecked = await page.$eval(
        "input[type='checkbox']",
        checkbox => (checkbox as HTMLInputElement).checked,
      );
      if (!accountsChecked) {
        await page.click("input[type='checkbox']");
      }
      await page.click('#submit-btn');

      // Confirmation page
      await page.waitForNavigation({ waitUntil: 'load' });
      await page.click('#cancel-btn');

      // Wait until redirect URL is captured
      const maxAttempts = 5;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        if (redirectUrl !== '') break;
        await new Promise(res => setTimeout(res, 500));
        this.logger.info(`Waiting for redirect URL: attempt ${attempt}/${maxAttempts}`);
      }

      if (!redirectUrl) {
        throw new Error('Redirect URL not captured after login flow');
      }

      return this.extractCode(redirectUrl);
    } catch (error) {
      this.logger.error(`Error during scraping: ${error}`);
      throw error;
    } finally {
      if (browser) await browser.close();
    }
  }
}
