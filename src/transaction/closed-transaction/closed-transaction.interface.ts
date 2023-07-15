import { IOrderItem } from '../../merchant'
import {
  IPaymentInstruction,
  PaymentStatus,
  PaymentMethod,
} from '../../payment'
import { IBaseTransaction } from '../transaction.interface'

/**
 * Interface representing a closed transaction.
 *
 * @extends IBaseTransaction
 * @see [Create Closed Payment - Tripay](https://tripay.co.id/developer?tab=transaction-create)
 */
export interface IClosedTransaction extends IBaseTransaction {
  /**
   * The reference number of the transaction.
   * @property {string}
   */
  reference: string

  /**
   * The type of payment selection.
   * @property {string}
   */
  payment_selection_type: string

  /**
   * The email address of the customer.
   * @property {string}
   */
  customer_email: string

  /**
   * The phone number of the customer, can be null.
   * @property {(null | string)}
   */
  customer_phone: null | string

  /**
   * The URL to callback after the transaction, can be null.
   * @property {(null | string)}
   */
  callback_url: null | string

  /**
   * The URL to return to after the transaction, can be null.
   * @property {(null | string)}
   */
  return_url: null | string

  /**
   * The amount of the transaction.
   * @property {number}
   */
  amount: number

  /**
   * The fee charged to the merchant.
   * @property {number}
   */
  fee_merchant: number

  /**
   * The fee charged to the customer.
   * @property {number}
   */
  fee_customer: number

  /**
   * The total fee of the transaction.
   * @property {number}
   */
  total_fee: number

  /**
   * The amount received in the transaction.
   * @property {number}
   */
  amount_received: number

  /**
   * The URL for checkout.
   * @property {string}
   */
  checkout_url: string

  /**
   * The status of the payment.
   * @property {PaymentStatus}
   */
  status: PaymentStatus

  /**
   * The time when the transaction expires.
   * @property {number}
   */
  expired_time: number

  /**
   * The items in the order.
   * @property {IOrderItem[]}
   */
  order_items: IOrderItem[]

  /**
   * The payment instructions.
   * @property {IPaymentInstruction[]}
   */
  instructions: IPaymentInstruction[]

  /**
   * The URL for payment, can be null.
   * @property {(null | string)}
   */
  pay_url: null | string
}

/**
 * Represents a closed transaction detail.
 *
 * @extends IClosedTransaction
 * @see [Detail Closed Payment - Tripay](https://tripay.co.id/developer?tab=transaction-detail)
 */
export interface IClosedTransactionDetail extends IClosedTransaction {
  /**
   * The date the transaction was paid at.
   * @type {string}
   */
  paid_at: string

  /**
   * The URL for payment.
   * @type {string}
   */
  pay_url: string
}

/**
 * Represents the parameters for a closed payment.
 *
 * @see [Create Closed Payment - Tripay](https://tripay.co.id/developer?tab=transaction-create)
 * @remarks
 * This interface is used to define the parameters required to create a closed payment.
 */
export interface IClosedPaymentParams {
  /**
   * The payment method.
   * @remarks
   * This property specifies the payment method for the closed payment.
   */
  method: PaymentMethod

  /**
   * The merchant reference.
   * @remarks
   * This property specifies the merchant reference for the closed payment.
   */
  merchant_ref: string

  /**
   * The payment amount.
   * @remarks
   * This property specifies the amount of the closed payment.
   */
  amount: number

  /**
   * The name of the customer.
   * @remarks
   * This property specifies the name of the customer for the closed payment.
   */
  customer_name: string

  /**
   * The email of the customer.
   * @remarks
   * This property specifies the email of the customer for the closed payment.
   */
  customer_email: string

  /**
   * The phone number of the customer.
   * @remarks
   * This property specifies the phone number of the customer for the closed payment.
   */
  customer_phone: string

  /**
   * Optional callback URL.
   * @remarks
   * This property specifies an optional callback URL for the closed payment.
   */
  callback_url?: string

  /**
   * Optional return URL.
   * @remarks
   * This property specifies an optional return URL for the closed payment.
   */
  return_url?: string

  /**
   * Optional expiration time.
   * @remarks
   * This property specifies an optional expiration time for the closed payment.
   */
  expired_time?: number
}
