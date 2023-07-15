import { BaseOptions } from '../global'
import { PaymentMethod } from '../payment'

/**
 * Interface representing a base transaction.
 */
export interface IBaseTransaction {
  /**
   * The reference number of the merchant.
   */
  merchant_ref: string

  /**
   * The name of the customer.
   */
  customer_name: string

  /**
   * The name of the payment.
   */
  payment_name: string

  /**
   * The payment method used.
   */
  payment_method: PaymentMethod

  /**
   * The pay code.
   */
  pay_code: string

  /**
   * The QR code string (optional).
   */
  qr_string?: null | string

  /**
   * The QR code URL (optional).
   */
  qr_url?: null | string
}

/**
 * Options for a transaction.
 */
export interface TransactionOptions extends BaseOptions {
  /**
   * The private key for authentication.
   */
  privateKey: string

  /**
   * The merchant code for identification.
   */
  merchantCode: string
}
