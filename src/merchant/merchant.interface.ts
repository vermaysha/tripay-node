import { PaymentMethod, PaymentStatus } from '../payment'
import { ITripayPagination } from '../request'

/**
 * Interface representing a fee calculator.
 *
 * @see [Cost Calculator - Tripay](https://tripay.co.id/developer?tab=merchant-fee-calculator)
 */
export interface IFeeCalc {
  /**
   * The code of the fee calculator.
   */
  code: string

  /**
   * The name of the fee calculator.
   */
  name: string

  /**
   * The fee details.
   */
  fee: {
    /**
     * The flat fee amount.
     */
    flat: number

    /**
     * The percentage fee amount.
     */
    percent: string

    /**
     * The minimum fee amount (nullable).
     */
    min: number | null

    /**
     * The maximum fee amount (nullable).
     */
    max: number | null
  }

  /**
   * The total fee amounts.
   */
  total_fee: {
    /**
     * The merchant fee amount.
     */
    merchant: number

    /**
     * The customer fee amount.
     */
    customer: number
  }
}

/**
 * Payment Channel interface represents a payment channel.
 *
 * @see [Payment Channels - Tripay](https://tripay.co.id/developer?tab=merchant-payment-channel)
 */
export interface IPaymentChannel {
  /**
   * Group of the payment channel.
   */
  group: string

  /**
   * Code of the payment channel.
   */
  code: string

  /**
   * Name of the payment channel.
   */
  name: string

  /**
   * Type of the payment channel.
   */
  type: string

  /**
   * Fee for the merchant.
   */
  fee_merchant: {
    /**
     * Flat fee for the merchant.
     */
    flat: number

    /**
     * Percentage fee for the merchant.
     */
    percent: number
  }

  /**
   * Fee for the customer.
   */
  fee_customer: {
    /**
     * Flat fee for the customer.
     */
    flat: number

    /**
     * Percentage fee for the customer.
     */
    percent: number
  }

  /**
   * The total fee for the payment channel.
   */
  total_fee: {
    /**
     * Flat total fee.
     */
    flat: number

    /**
     * Percentage total fee.
     */
    percent: string
  }

  /**
   * The minimum fee for the payment channel.
   * Can be null if there is no minimum fee.
   */
  minimum_fee: number | null

  /**
   * The maximum fee for the payment channel.
   * Can be null if there is no maximum fee.
   */
  maximum_fee: number | null

  /**
   * The URL for the icon of the payment channel.
   */
  icon_url: string

  /**
   * Indicates whether the payment channel is active or not.
   */
  active: boolean
}

/**
 * Represents an order item.
 */
export interface IOrderItem {
  /**
   * The SKU of the item.
   * Can be null if not available.
   */
  sku: null | string

  /**
   * The name of the item.
   */
  name: string

  /**
   * The price of the item.
   */
  price: number

  /**
   * The quantity of the item.
   */
  quantity: number

  /**
   * The subtotal of the item.
   * Can be null if not available.
   */
  subtotal: null | number

  /**
   * The URL of the product.
   * Can be null if not available.
   */
  product_url: string | null

  /**
   * The URL of the image.
   * Can be null if not available.
   */
  image_url: string | null
}

/**
 * Represents a transaction.
 *
 * @see [Transactions List - Tripay](https://tripay.co.id/developer?tab=merchant-transactions)
 */
export interface ITransaction {
  /**
   * The reference of the transaction.
   */
  reference: string

  /**
   * The reference of the merchant.
   */
  merchant_ref: string

  /**
   * The type of payment selection.
   */
  payment_selection_type: string

  /**
   * The payment method used.
   */
  payment_method: PaymentMethod

  /**
   * The name of the payment.
   */
  payment_name: string

  /**
   * The name of the customer.
   */
  customer_name: string

  /**
   * The email of the customer.
   */
  customer_email: string

  /**
   * The phone number of the customer.
   */
  customer_phone: null | string

  /**
   * The callback URL for the transaction.
   */
  callback_url: null | string

  /**
   * The return URL for the transaction.
   */
  return_url: null | string

  /**
   * The amount of the transaction.
   */
  amount: number

  /**
   * The merchant fee for the transaction.
   */
  fee_merchant: number

  /**
   * The customer fee for the transaction.
   */
  fee_customer: number

  /**
   * The total fee for the transaction.
   */
  total_fee: number

  /**
   * The amount received for the transaction.
   */
  amount_received: number

  /**
   * The payment code.
   */
  pay_code: null | string

  /**
   * The payment URL.
   */
  pay_url: null | string

  /**
   * The checkout URL.
   */
  checkout_url: string

  /**
   * The order items for the transaction.
   */
  order_items: Omit<IOrderItem, 'product_url' | 'image_url'>[]

  /**
   * The status of the payment.
   */
  status: PaymentStatus

  /**
   * Additional notes for the transaction.
   */
  note: null | string

  /**
   * The creation timestamp of the transaction.
   */
  created_at: number

  /**
   * The expiration timestamp of the transaction.
   */
  expired_at: number

  /**
   * The timestamp when the transaction was paid.
   */
  paid_at: null | number
}

/**
 * Represents a collection of transactions.
 *
 * @see [Transactions List - Tripay](https://tripay.co.id/developer?tab=merchant-transactions)
 */
export interface ITransactions {
  /**
   * The array of transactions.
   */
  data: ITransaction[]

  /**
   * The pagination information.
   */
  pagination: ITripayPagination
}

export interface TransactionParams {
  page?: number
  per_page?: number
  sort?: 'desc' | 'asc'
  reference?: string
  merchant_ref?: string
  method?: PaymentMethod
  status?: string
}
