# 📦 @migueddev/schwab-client

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

> An unofficial client in **Node.js + TypeScript** to interact with the **Charles Schwab** API.  
> Supports OAuth2 authentication, token auto-refresh, authorization scraping, and access to Trader and Market Data APIs.

---

## ✨ Features

- 🔑 **OAuth2 Authentication** (Authorization Code + Refresh Token)
- ♻️ **Automatic token refresh**
- 📂 **Token persistence** in JSON file
- 🛠 **Modular**: Clear separation between `TraderAPI`, `MarketDataAPI`
- 🖥 **TOTP (2FA) support**
- 🤖 **Scraping with Puppeteer** to get the `authorization_code`

---

## 📦 Installation

```bash
npm install @migueddev/schwab-client
```

---

## 🚀 Usage

### Client initialization

```ts
import { SchwabClient } from '@migueddev/schwab-client';

(async () => {
  const client = await SchwabClient.init({
    loginId: 'your-login-id',
    password: 'your-password',
    totpSecret: 'your-2fa-secret',
    appKey: 'your-app-key',
    appSecret: 'your-app-secret',
    callbackUrl: 'https://your-callback-url.com',
    tokensFilePath: './tokens.json', // optional
    timeoutMs: 5000, // optional
    enableLogging: true, // optional
    autoRefreshTokens: true, // optional
  });

  // List all linked accounts
  const accounts = await client.trader.getLinkedAccounts();
  console.log(accounts);

  // Get details for a specific account
  const accountDetails = await client.trader.getAccountDetails(
    accounts[0].accountHash,
    { fields: 'positions' },
  );
  console.log(accountDetails);
})();
```

---

## ⚙️ API

The client presents the following main modules:

### `trader`

- `getLinkedAccounts()` - Get list of linked account numbers (encrypted)
- `getAccountDetails(accountHash, params)` - Get balances and optionally positions for a specific account
- `getAllAccountsDetails(params)` - Get balances and optionally positions for all linked accounts
- `getAccountOrders(accountHash, params)` - Get orders for a specific account
- `placeOrder(accountHash, orderRequest)` - Place a new order for a specific account
- `getOrderDetails(accountHash, orderId)` - Get details of a specific order for a specific account
- `cancelOrder(accountHash, orderId)` - Cancel a specific order for a specific account
- `replaceOrder(accountHash, orderId, orderRequest)` - Replace a specific order for a specific account
- `getAllOrders(params)` - Get all orders across all accounts
- `previewOrder(accountHash, previewOrder)` - Preview an order before placing it

---

## 👪 Contributing

Contributions to `@migueddev/schwab-client` are always welcome! If you want to contribute:

1. **Follow Conventional Commits**: All commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) standard.
2. **Fork the repository** and create a branch for your feature or bugfix.
3. **Write clear code and tests**: Make sure your code is well-structured, readable, and includes tests where applicable.
4. **Submit a Pull Request (PR)**: Provide a detailed description of the changes and link any related issues.
5. **Review Process**: Your PR will be reviewed and feedback may be provided before merging.

We appreciate your contributions to make `@migueddev/schwab-client` better!

---

## 📜 Licencia

This project is under license [MIT](./LICENSE).

---

## ⚠️ Disclaimer

This is an **unofficial** Schwab API client.
Use at your own risk. Please adhere to Charles Schwab's Terms and Conditions.
