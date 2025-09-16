export type status =
  | 'AWAITING_PARENT_ORDER'
  | 'AWAITING_CONDITION'
  | 'AWAITING_STOP_CONDITION'
  | 'AWAITING_MANUAL_REVIEW'
  | 'ACCEPTED'
  | 'AWAITING_UR_OUT'
  | 'PENDING_ACTIVATION'
  | 'QUEUED'
  | 'WORKING'
  | 'REJECTED'
  | 'PENDING_CANCEL'
  | 'CANCELED'
  | 'PENDING_REPLACE'
  | 'REPLACED'
  | 'FILLED'
  | 'EXPIRED'
  | 'NEW'
  | 'AWAITING_RELEASE_TIME'
  | 'PENDING_ACKNOWLEDGEMENT'
  | 'PENDING_RECALL'
  | 'UNKNOWN';

export type apiOrderStatus =
  | 'AWAITING_PARENT_ORDER'
  | 'AWAITING_CONDITION'
  | 'AWAITING_STOP_CONDITION'
  | 'AWAITING_MANUAL_REVIEW'
  | 'ACCEPTED'
  | 'AWAITING_UR_OUT'
  | 'PENDING_ACTIVATION'
  | 'QUEUED'
  | 'WORKING'
  | 'REJECTED'
  | 'PENDING_CANCEL'
  | 'CANCELED'
  | 'PENDING_REPLACE'
  | 'REPLACED'
  | 'FILLED'
  | 'EXPIRED'
  | 'NEW'
  | 'AWAITING_RELEASE_TIME'
  | 'PENDING_ACKNOWLEDGEMENT'
  | 'PENDING_RECALL'
  | 'UNKNOWN';

export type session = 'NORMAL' | 'AM' | 'PM' | 'SEAMLESS';

export type duration =
  | 'DAY'
  | 'GOOD_TILL_CANCEL'
  | 'FILL_OR_KILL'
  | 'IMMEDIATE_OR_CANCEL'
  | 'END_OF_WEEK'
  | 'END_OF_MONTH'
  | 'NEXT_END_OF_MONTH'
  | 'UNKNOWN';

export type orderTypeRequest =
  | 'MARKET'
  | 'LIMIT'
  | 'STOP'
  | 'STOP_LIMIT'
  | 'TRAILING_STOP'
  | 'CABINET'
  | 'NON_MARKETABLE'
  | 'MARKET_ON_CLOSE'
  | 'EXERCISE'
  | 'TRAILING_STOP_LIMIT'
  | 'NET_DEBIT'
  | 'NET_CREDIT'
  | 'NET_ZERO'
  | 'LIMIT_ON_CLOSE';

export type orderType =
  | 'MARKET'
  | 'LIMIT'
  | 'STOP'
  | 'STOP_LIMIT'
  | 'TRAILING_STOP'
  | 'CABINET'
  | 'NON_MARKETABLE'
  | 'MARKET_ON_CLOSE'
  | 'EXERCISE'
  | 'TRAILING_STOP_LIMIT'
  | 'NET_DEBIT'
  | 'NET_CREDIT'
  | 'NET_ZERO'
  | 'LIMIT_ON_CLOSE'
  | 'UNKNOWN';

export type complexOrderStrategyType =
  | 'NONE'
  | 'COVERED'
  | 'VERTICAL'
  | 'BACK_RATIO'
  | 'CALENDAR'
  | 'DIAGONAL'
  | 'STRADDLE'
  | 'STRANGLE'
  | 'COLLAR_SYNTHETIC'
  | 'BUTTERFLY'
  | 'CONDOR'
  | 'IRON_CONDOR'
  | 'VERTICAL_ROLL'
  | 'COLLAR_WITH_STOCK'
  | 'DOUBLE_DIAGONAL'
  | 'UNBALANCED_BUTTERFLY'
  | 'UNBALANCED_CONDOR'
  | 'UNBALANCED_IRON_CONDOR'
  | 'UNBALANCED_VERTICAL_ROLL'
  | 'MUTUAL_FUND_SWAP'
  | 'CUSTOM';

export type stopPriceLinkBasis =
  | 'MANUAL'
  | 'BASE'
  | 'TRIGGER'
  | 'LAST'
  | 'BID'
  | 'ASK'
  | 'ASK_BID'
  | 'MARK'
  | 'AVERAGE';

export type stopPriceLinkType = 'VALUE' | 'PERCENT' | 'TICK';

export type stopType = 'STANDARD' | 'BID' | 'ASK' | 'LAST' | 'MARK';

export type priceLinkBasis =
  | 'MANUAL'
  | 'BASE'
  | 'TRIGGER'
  | 'LAST'
  | 'BID'
  | 'ASK'
  | 'ASK_BID'
  | 'MARK'
  | 'AVERAGE';

export type priceLinkType = 'VALUE' | 'PERCENT' | 'TICK';

export type taxLotMethod =
  | 'FIFO'
  | 'LIFO'
  | 'HIGH_COST'
  | 'LOW_COST'
  | 'AVERAGE_COST'
  | 'SPECIFIC_LOT'
  | 'LOSS_HARVESTER';

export type OrderLegType =
  | 'EQUITY'
  | 'OPTION'
  | 'INDEX'
  | 'MUTUAL_FUND'
  | 'CASH_EQUIVALENT'
  | 'FIXED_INCOME'
  | 'CURRENCY'
  | 'COLLECTIVE_INVESTMENT';

export type assetType =
  | 'EQUITY'
  | 'MUTUAL_FUND'
  | 'OPTION'
  | 'FUTURE'
  | 'FOREX'
  | 'INDEX'
  | 'CASH_EQUIVALENT'
  | 'FIXED_INCOME'
  | 'PRODUCT'
  | 'CURRENCY'
  | 'COLLECTIVE_INVESTMENT';

export type specialInstruction = 'ALL_OR_NONE' | 'DO_NOT_REDUCE' | 'ALL_OR_NONE_DO_NOT_REDUCE';

export type orderStrategyType =
  | 'SINGLE'
  | 'CANCEL'
  | 'RECALL'
  | 'PAIR'
  | 'FLATTEN'
  | 'TWO_DAY_SWAP'
  | 'BLAST_ALL'
  | 'OCO'
  | 'TRIGGER';

export type instruction =
  | 'BUY'
  | 'SELL'
  | 'BUY_TO_COVER'
  | 'SELL_SHORT'
  | 'BUY_TO_OPEN'
  | 'BUY_TO_CLOSE'
  | 'SELL_TO_OPEN'
  | 'SELL_TO_CLOSE'
  | 'EXCHANGE'
  | 'SELL_SHORT_EXEMPT';

export type settlementInstruction = 'REGULAR' | 'CASH' | 'NEXT_DAY' | 'UNKNOWN';

export type amountIndicator = 'DOLLARS' | 'SHARES' | 'ALL_SHARES' | 'PERCENTAGE' | 'UNKNOWN';

export type APIRuleAction = 'ACCEPT' | 'ALERT' | 'REJECT' | 'REVIEW' | 'UNKNOWN';

export type FeeType =
  | 'COMMISSION'
  | 'SEC_FEE'
  | 'STR_FEE'
  | 'R_FEE'
  | 'CDSC_FEE'
  | 'OPT_REG_FEE'
  | 'ADDITIONAL_FEE'
  | 'MISCELLANEOUS_FEE'
  | 'FTT'
  | 'FUTURES_CLEARING_FEE'
  | 'FUTURES_DESK_OFFICE_FEE'
  | 'FUTURES_EXCHANGE_FEE'
  | 'FUTURES_GLOBEX_FEE'
  | 'FUTURES_NFA_FEE'
  | 'FUTURES_PIT_BROKERAGE_FEE'
  | 'FUTURES_TRANSACTION_FEE'
  | 'LOW_PROCEEDS_COMMISSION'
  | 'BASE_CHARGE'
  | 'GENERAL_CHARGE'
  | 'GST_FEE'
  | 'TAF_FEE'
  | 'INDEX_OPTION_FEE'
  | 'TEFRA_TAX'
  | 'STATE_TAX'
  | 'UNKNOWN';

export interface AccountAPIOptionDeliverable {
  symbol: string;
  assetType: assetType;
  deliverableUnits: number;
  apiCurrencyType: 'USD' | 'CAD' | 'EUR' | 'JPY';
}

export interface AccountsBaseInstrument {
  assetType: string;
  cusip: string;
  symbol: string;
  description: string;
  instrumentId?: number;
  netChange?: number;
}

export interface AccountCashEquivalent extends AccountsBaseInstrument {
  assetType: 'CASH_EQUIVALENT';
  type: 'SWEEP_VEHICLE' | 'SAVINGS' | 'MONEY_MARKET_FUND' | 'UNKNOWN';
}

export interface AccountEquity extends AccountsBaseInstrument {
  assetType: 'EQUITY';
}

export interface AccountFixedIncome extends AccountsBaseInstrument {
  assetType: 'FIXED_INCOME';
  maturityDate: Date;
  factor: number;
  variableRate: number;
}

export interface AccountMutualFund extends AccountsBaseInstrument {
  assetType: 'MUTUAL_FUND';
}

export interface AccountOption extends AccountsBaseInstrument {
  assetType: 'OPTION';
  optionDeliverables: AccountAPIOptionDeliverable[];
  putCall: 'PUT' | 'CALL' | 'UNKNOWN';
  optionMultiplier: number;
  type: 'VANILLA' | 'BINARY' | 'BARRIER' | 'UNKNOWN';
  underlyingSymbol: string;
}

export interface AccountIndex extends AccountsBaseInstrument {
  assetType: 'INDEX';
}

export interface AccountCurrency extends AccountsBaseInstrument {
  assetType: 'CURRENCY';
}

export interface AccountCollectiveInvestment extends AccountsBaseInstrument {
  assetType: 'COLLECTIVE_INVESTMENT';
}

export type AccountsInstrument =
  | AccountCashEquivalent
  | AccountEquity
  | AccountFixedIncome
  | AccountMutualFund
  | AccountOption
  | AccountIndex
  | AccountCurrency
  | AccountCollectiveInvestment;

export interface OrderLegCollection {
  orderLegType: OrderLegType;
  legId: number;
  instrument: AccountsInstrument;
  instruction: instruction;
  positionEffect: 'OPENING' | 'CLOSING' | 'AUTOMATIC';
  quantity: number;
  quantityType: 'ALL_SHARES' | 'DOLLARS' | 'SHARES';
  divCapGains: 'REINVEST' | 'PAYOUT';
  toSymbol: string;
}

export interface ExecutionLeg {
  legId: number;
  quantity: number;
  mismarkedQuantity: number;
  price: number;
  time: Date;
  instrumentId: number;
}

export interface OrderActivity {
  activityType: 'EXECUTION' | 'ORDER_ACTION';
  executionType: 'FILL';
  quantity: number;
  orderRemainingQuantity: number;
  executionLegs: ExecutionLeg[];
}

export interface OrderRequest {
  session: session;
  duration: duration;
  orderType: orderTypeRequest;
  cancelTime: Date;
  complexOrderStrategyType: complexOrderStrategyType;
  quantity: number;
  filledQuantity: number;
  remainingQuantity: number;
  destinationLinkName: string;
  releaseTime: Date;
  stopPrice: number;
  stopPriceLinkBasis: stopPriceLinkBasis;
  stopPriceLinkType: stopPriceLinkType;
  stopPriceOffset: number;
  stopType: stopType;
  priceLinkBasis: priceLinkBasis;
  priceLinkType: priceLinkType;
  price: number;
  taxLotMethod: taxLotMethod;
  orderLegCollection: OrderLegCollection[];
  activationPrice: number;
  specialInstruction: specialInstruction;
  orderStrategyType: orderStrategyType;
  orderId: number;
  cancelable: boolean;
  editable: boolean;
  status: status;
  enteredTime: Date;
  closeTime: Date;
  accountNumber: string;
  orderActivityCollection: OrderActivity[];
  replacingOrderCollection: Record<string, unknown>[];
  childOrderStrategies: Record<string, unknown>[];
  statusDescription: string;
}

export interface OrderBalance {
  orderValue: number;
  projectedAvailableFund: number;
  projectedBuyingPower: number;
  projectedCommission: number;
}

export interface OrderLeg {
  askPrice: number;
  bidPrice: number;
  lastPrice: number;
  markPrice: number;
  projectedCommission: number;
  quantity: number;
  finalSymbol: string;
  legId: number;
  assetType: assetType;
  instruction: instruction;
}

export interface OrderStrategy {
  accountNumber: string;
  advanceOrderType:
    | 'NONE'
    | 'OTO'
    | 'OCO'
    | 'OTOCO'
    | 'OT2OCO'
    | 'OT3OCO'
    | 'BLAST_ALL'
    | 'OTA'
    | 'PAIR';
  closeTime: Date;
  enteredTime: Date;
  orderBalance: OrderBalance;
  orderStrategyType: orderStrategyType;
  orderVersion: number;
  session: session;
  status: apiOrderStatus;
  allOrNone: boolean;
  discretionary: boolean;
  duration: duration;
  filledQuantity: number;
  orderType: orderType;
  orderValue: number;
  price: number;
  quantity: number;
  remainingQuantity: number;
  sellNonMarginableFirst: boolean;
  settlementInstruction: settlementInstruction;
  strategy: complexOrderStrategyType;
  amountIndicator: amountIndicator;
  orderLegs: OrderLeg[];
}

export interface OrderValidationDetail {
  validationRuleName: string;
  message: string;
  activityMessage: string;
  originalSeverity: APIRuleAction;
  overrideName: string;
  overrideSeverity: APIRuleAction;
}

export interface OrderValidationResult {
  alerts: OrderValidationDetail[];
  accepts: OrderValidationDetail[];
  rejects: OrderValidationDetail[];
  reviews: OrderValidationDetail[];
  warns: OrderValidationDetail[];
}

export interface CommissionValue {
  value: number;
  type: FeeType;
}

export interface CommissionLeg {
  commissionValues: CommissionValue[];
}

export interface Commission {
  commissionLegs: CommissionLeg[];
}

export interface FeeValue {
  value: number;
  type: FeeType;
}

export interface FeeLeg {
  feeValues: FeeValue[];
}

export interface Fees {
  feeLegs: FeeLeg[];
}

export interface CommissionAndFee {
  commission: number;
  fee: Fees;
  trueCommission: Commission;
}

export interface PreviewOrder {
  orderId: number;
  orderStrategy: OrderStrategy;
  orderValidationResult: OrderValidationResult;
  commissionAndFee: CommissionAndFee;
}

export interface GetOrdersParams {
  fromEnteredTime: Date;
  toEnteredTime: Date;
  maxResults?: number;
  status?: status;
  [key: string]: unknown;
}
