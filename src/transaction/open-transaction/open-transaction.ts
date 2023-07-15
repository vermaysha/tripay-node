import { TripayError } from '../../error'
import { HTTPRequest } from '../../request'
import { Signature } from '../../signature'
import {
  IOpenPaymentListParams,
  IOpenPaymentParams,
  IOpenTransaction,
  IOpenTransactionList,
  IOpenTransactionLists,
} from './open-transaction.interface'
import { TransactionOptions } from '../transaction.interface'

/**
 * Represents an open transaction.
 *
 */
export class OpenTransaction {
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
   * Constructs a new OpenTransaction instance.
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
   * Creating a new transaction or generating a payment code for Open Payment type.
   *
   * @param {IOpenPaymentParams} params - The payment parameters.
   * @returns A promise that resolves to the created transaction.
   * @throws {TripayError} Throws an error if failed to create the transaction.
   * @see [Create Open Payment - Tripay](https://tripay.co.id/developer?tab=open-payment-create)
   */
  async create(params: IOpenPaymentParams): Promise<IOpenTransaction> {
    const { merchant_ref, method, customer_name } = params

    const signature = Signature.generate({
      merchantRef: merchant_ref,
      merchantCode: this.merchantCode,
      privateKey: this.privateKey,
      channel: method,
    })

    this.request.setBody({
      method,
      merchant_ref,
      customer_name,
      signature,
    })

    const res = await this.request.fetch('open-payment/create', 'POST')

    return res.data as IOpenTransaction
  }

  /**
   * Fetching the details of the previously made open payment transaction.
   *
   * @param {string} uuid - The UUID of the transaction.
   * @returns A promise that resolves to the transaction details.
   * @throws {TripayError} Throws an error if failed to retrieve the transaction.
   * @see [Detail Open Payment - Tripay](https://tripay.co.id/developer?tab=open-payment-detail)
   */
  async detail(uuid: string): Promise<IOpenTransaction> {
    const res = await this.request.fetch(`open-payment/${uuid}/detail`)

    return res.data as IOpenTransaction
  }

  /**
   * Retrieving a list of incoming payments for open payment.
   *
   * @param {string} uuid - The UUID of the payment.
   * @param {IOpenPaymentListParams} params - The list parameters.
   * @returns A promise that resolves to the list of transactions.
   * @throws {TripayError} Throws an error if failed to list the transactions.
   * @see [Open Transactions List - Tripay](https://tripay.co.id/developer?tab=open-payment-transactions)
   */
  async list(
    uuid: string,
    params?: IOpenPaymentListParams,
  ): Promise<IOpenTransactionLists> {
    if (params?.per_page && params.per_page > 100) {
      throw new TripayError(
        'Parameter per_page is too big, maximum is 100 item per_page',
      )
    }

    this.request.setParams({
      reference: params?.reference,
      start_date: params?.start_date
        ? this.formatDateTime(params?.start_date)
        : undefined,
      end_date: params?.end_date
        ? this.formatDateTime(params?.end_date)
        : undefined,
      per_page: params?.per_page,
    })

    const res = await this.request.fetch(`open-payment/${uuid}/transactions`)
    const data = res.data as IOpenTransactionList[]

    return {
      data,
      pagination: res.pagination,
    } as IOpenTransactionLists
  }

  /**
   * Formats a date and time to a string in the format "YYYY-MM-DD HH:mm:ss".
   *
   * @param {Date} date - The date to format.
   * @returns The formatted date and time string.
   */
  private formatDateTime(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
}
