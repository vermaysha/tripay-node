import { PaymentStatus, PaymentMethod } from '../../payment'
import { ITripayPagination } from '../../request'
import { IBaseTransaction } from '../transaction.interface'

/**
 * Interface for an open transaction.
 *
 * @see [Detail Open Payment - Tripay](https://tripay.co.id/developer?tab=open-payment-detail)
 */
export interface IOpenTransaction extends IBaseTransaction {
  /**
   * The UUID of the transaction.
   */
  uuid: string
}

/**
 * Represents the data structure for an open transaction list.
 *
 * @see [Open Transactions List - Tripay](https://tripay.co.id/developer?tab=open-payment-transactions)
 */
export interface IOpenTransactionList {
  /** The reference of the transaction. */
  reference: string

  /** The merchant reference of the transaction. */
  merchant_ref: string

  /** The payment method used for the transaction. */
  payment_method: PaymentMethod

  /** The name of the payment. */
  payment_name: string

  /** The name of the customer. */
  customer_name: string

  /** The amount of the transaction. */
  amount: number

  /** The merchant fee for the transaction. */
  fee_merchant: number

  /** The customer fee for the transaction. */
  fee_customer: number

  /** The total fee for the transaction. */
  total_fee: number

  /** The amount received for the transaction. */
  amount_received: number

  /** The URL for the checkout page. */
  checkout_url: string

  /** The status of the payment. */
  status: PaymentStatus

  /** The timestamp when the payment was made. */
  paid_at: number
}

/**
 * Represents the interface for open transaction lists.
 *
 * @see [Open Transactions List - Tripay](https://tripay.co.id/developer?tab=open-payment-transactions)
 */
export interface IOpenTransactionLists {
  /**
   * The data of the open transaction list.
   */
  data: IOpenTransactionList[]

  /**
   * The pagination information for the open transaction list.
   */
  pagination: ITripayPagination
}

/**
 * Interface for the parameters required to open a payment.
 *
 * @see [Create Open Payment - Tripay](https://tripay.co.id/developer?tab=open-payment-create)
 */
export interface IOpenPaymentParams {
  /**
   * The payment method to be used.
   */
  method: PaymentMethod

  /**
   * The reference number for the merchant.
   */
  merchant_ref: string

  /**
   * The name of the customer.
   */
  customer_name: string
}

/**
 * Interface for the parameters required to list open payments.
 *
 * @see [Open Transactions List - Tripay](https://tripay.co.id/developer?tab=open-payment-transactions)
 */
export interface IOpenPaymentListParams {
  /**
   * Optional reference number.
   */
  reference?: string

  /**
   * Optional reference number for the merchant.
   */
  merchant_ref?: string

  /**
   * Optional start date.
   */
  start_date?: Date

  /**
   * Optional end date.
   */
  end_date?: Date

  /**
   * Optional number of payments per page.
   */
  per_page?: number
}
