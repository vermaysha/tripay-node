import { PaymentMethod, PaymentStatus } from '../payment'

/**
 * Interface representing a callback object.
 *
 * @see [Callback - Tripay](https://tripay.co.id/developer?tab=callback)
 */
export interface ICallback {
  /**
   * Transaction reference number.
   */
  reference: string

  /**
   * The reference/invoice number from the merchant system sent when requesting a transaction.
   */
  merchant_ref: string

  /**
   * The name of the payment channel used.
   */
  payment_method: string

  /**
   * The name of the payment channel used.
   */
  payment_method_code: PaymentMethod

  /**
   * The amount paid by the customer.
   */
  total_amount: number

  /**
   * The amount of fees charged to the merchant.
   */
  fee_merchant: number

  /**
   * The amount charged to the customer.
   */
  fee_customer: number

  /**
   * Total amount charged.
   */
  total_fee: number

  /**
   * The net amount received by the merchant.
   */
  amount_received: number

  /**
   * Indicates if the payment is closed or not.
   */
  is_closed_payment: number

  /**
   * The status of the payment.
   */
  status: PaymentStatus

  /**
   * Unix timestamp payment time successful.
   */
  paid_at: number | null

  /**
   * Additional information.
   */
  note: null | string
}
