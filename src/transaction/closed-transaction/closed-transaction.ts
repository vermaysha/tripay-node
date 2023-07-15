import { TripayError } from '../../error'
import { IOrderItem } from '../../merchant'
import { isPaymentMethod } from '../../payment'
import { HTTPRequest } from '../../request'
import { Signature } from '../../signature'
import {
  IClosedPaymentParams,
  IClosedTransaction,
  IClosedTransactionDetail,
} from './closed-transaction.interface'
import { TransactionOptions } from '../transaction.interface'

/**
 * Represents a closed transaction.
 */
export class ClosedTransaction {
  /**
   * HTTP Request
   */
  private request: HTTPRequest

  /**
   * The private key for authentication.
   */
  private privateKey: string

  /**
   * The merchant code for identification.
   */
  private merchantCode: string

  /**
   * Order items
   */
  private orderItems: IOrderItem[] = []

  /**
   * Creates an instance of ClosedTransaction.
   *
   * @param {TransactionOptions} options - The transaction options.
   */
  constructor(options: TransactionOptions) {
    this.request = new HTTPRequest({
      apiToken: options.apiToken,
      sandbox: options.sandbox ?? false,
    })
    this.privateKey = options.privateKey
    this.merchantCode = options.merchantCode
  }

  /**
   * Adds an order item to the transaction.
   *
   * @param {IOrderItem} orderItem - The order item to add.
   * @returns The updated ClosedTransaction instance.
   */
  addOrderItem(orderItem: IOrderItem): ClosedTransaction {
    this.orderItems.push(orderItem)
    return this
  }

  /**
   * Adds multiple order items to the transaction.
   *
   * @param {IOrderItem[]} orderItems - The order items to add.
   * @returns The updated ClosedTransaction instance.
   */
  addOrderItems(orderItems: IOrderItem[]): ClosedTransaction {
    this.orderItems = [...this.orderItems, ...orderItems]
    return this
  }

  /**
   * Creating a new transaction or generating a payment code.
   *
   * @param params - The payment parameters.
   * @returns A promise that resolves to the created closed transaction.
   * @throws {TripayError} Throws an error if failed to create the transaction.
   * @see [Create Closed Payment - Tripay](https://tripay.co.id/developer?tab=transaction-create)
   */
  async create(params: IClosedPaymentParams): Promise<IClosedTransaction> {
    // Parameter validation
    const {
      method,
      merchant_ref,
      amount,
      customer_name,
      customer_email,
      customer_phone,
      callback_url,
      return_url,
      expired_time,
    } = params
    if (method && isPaymentMethod(method) === false) {
      throw new TripayError('Parameter method is incorrect')
    }

    if (this.orderItems.length === 0) {
      throw new TripayError('Parameter order_items is empty')
    }

    // Generate signature
    const signature = Signature.generate({
      amount,
      merchantRef: merchant_ref,
      merchantCode: this.merchantCode,
      privateKey: this.privateKey,
    })

    // Set request body
    this.request.setBody({
      method,
      merchant_ref,
      amount,
      customer_name,
      customer_email,
      customer_phone,
      callback_url,
      return_url,
      expired_time:
        expired_time ?? Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60,
      signature,
      order_items: this.orderItems,
    })

    // Clear order items
    this.orderItems = []

    // Send request and return the created closed transaction
    const res = await this.request.fetch('transaction/create', 'POST')
    return res.data as IClosedTransaction
  }

  /**
   * Fetching the details of a previously made transaction.
   * It can also be used to check the payment status.
   *
   * @param reference - The reference of the transaction.
   * @returns A promise that resolves to the details of the closed transaction.
   * @throws {TripayError} Throws an error if failed to retrieve the transaction.
   * @see [Detail Closed Transaction - Tripay](https://tripay.co.id/developer?tab=transaction-detail)
   */
  async detail(reference: string): Promise<IClosedTransactionDetail> {
    // Set request parameters
    this.request.setParams({
      reference,
    })

    // Send request and return the details of the closed transaction
    const res = await this.request.fetch('transaction/detail', 'GET')
    return res.data as IClosedTransactionDetail
  }
}
