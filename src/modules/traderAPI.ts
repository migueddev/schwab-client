import { AxiosInstance } from 'axios';

import { AccountQueryParams, GetOrdersParams, OrderRequest, PreviewOrder } from '../types';
import { BaseAPI } from './baseAPI';

/**
 * TraderAPI class
 * Handles all Schwab Trader API endpoints:
 *  - Accounts
 *  - Orders
 */
export class TraderAPI extends BaseAPI {
  constructor(private axios: AxiosInstance) {
    super();
  }

  /**
   * Get list of linked account numbers (encrypted)
   * Schwab requires encrypted account numbers for all subsequent requests.
   * @returns Promise resolving to the list of account numbers
   */
  public async getLinkedAccounts() {
    return this.axios.get('/trader/v1/accounts/accountNumbers');
  }

  /**
   * Get balances and optionally positions for all linked accounts
   * @param params Optional query parameters specifying fields to return (e.g., positions)
   * @returns Promise resolving to account details
   */
  public async getAllAccountsDetails(params?: AccountQueryParams) {
    return this.axios.get('/trader/v1/accounts', {
      params: this.paramsParser(params),
    });
  }

  /**
   * Get balances and optionally positions for a specific account
   * @param accountHash Encrypted account identifier
   * @param params Optional query parameters specifying fields to return (e.g., positions)
   * @returns Promise resolving to account details
   */
  public async getAccountDetails(accountHash: string, params?: AccountQueryParams) {
    return this.axios.get(`/trader/v1/accounts/${accountHash}`, {
      params: this.paramsParser(params),
    });
  }

  /**
   * Get orders for a specific account
   * @param accountHash Encrypted account identifier
   * @param params Query parameters for filtering orders (from/to dates, max results, status)
   * @returns Promise resolving to a list of orders
   */
  public async getAccountOrders(accountHash: string, params: GetOrdersParams) {
    return this.axios.get(`/trader/v1/accounts/${accountHash}/orders`, {
      params: this.paramsParser(params),
    });
  }

  /**
   * Place a new order for a specific account
   * @param accountHash Encrypted account identifier
   * @param orderRequest Order request payload
   * @returns Promise resolving to the placed order
   */
  public async placeOrder(accountHash: string, orderRequest: OrderRequest) {
    return this.axios.post(`/trader/v1/accounts/${accountHash}/orders`, orderRequest);
  }

  /**
   * Get details of a specific order for a specific account
   * @param accountHash Encrypted account identifier
   * @param orderId Order ID
   * @returns Promise resolving to order details
   */
  public async getOrderDetails(accountHash: string, orderId: number) {
    return this.axios.get(`/trader/v1/accounts/${accountHash}/orders/${orderId}`);
  }

  /**
   * Cancel a specific order for a specific account
   * @param accountHash Encrypted account identifier
   * @param orderId Order ID
   * @returns Promise resolving to cancelation confirmation
   */
  public async cancelOrder(accountHash: string, orderId: number) {
    return this.axios.delete(`/trader/v1/accounts/${accountHash}/orders/${orderId}`);
  }

  /**
   * Replace a specific order for a specific account
   * @param accountHash Encrypted account identifier
   * @param orderId Order ID
   * @param orderRequest Updated order request payload
   * @returns Promise resolving to updated order
   */
  public async replaceOrder(accountHash: string, orderId: number, orderRequest: OrderRequest) {
    return this.axios.put(`/trader/v1/accounts/${accountHash}/orders/${orderId}`, orderRequest);
  }

  /**
   * Get all orders across all accounts
   * @param params Query parameters for filtering orders (from/to dates, max results, status)
   * @returns Promise resolving to the list of orders
   */
  public async getAllOrders(params: GetOrdersParams) {
    return this.axios.get('/trader/v1/orders', {
      params: this.paramsParser(params),
    });
  }

  /**
   * Preview an order before placing it
   * @param accountHash Encrypted account identifier
   * @param previewOrder Order preview payload
   * @returns Promise resolving to order preview result
   */
  public async previewOrder(accountHash: string, previewOrder: PreviewOrder) {
    return this.axios.post(`/trader/v1/accounts/${accountHash}/orders/previewOrder`, previewOrder);
  }
}
