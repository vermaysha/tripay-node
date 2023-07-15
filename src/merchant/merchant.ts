import { PaymentMethod, isPaymentMethod } from '../payment'
import { TripayError } from '../error'
import { HTTPRequest } from '../request'
import {
  IFeeCalc,
  IPaymentChannel,
  ITransaction,
  ITransactions,
  TransactionParams,
} from './merchant.interface'
import { BaseOptions } from '../global'

/**
 * The class contains methods to access the Merchant API on Tripay.
 *
 */
export class Merchant {
  /**
   * HTTP Request
   *
   */
  private request: HTTPRequest

  /**
   * Creates a new instance of the Merchant class.
   *
   * @param {BaseOptions} options - The options for configuring the Merchant instance.
   */
  constructor(options: BaseOptions) {
    // Initialize the HTTPRequest object.
    this.request = new HTTPRequest({
      apiToken: options.apiToken,
      sandbox: options.sandbox ?? false,
    })
  }

  /**
   * Obtaining a list of active payment channels on your Merchant account,
   * including complete information including transaction fees for each channel.
   *
   * @param {PaymentMethod} code - Optional. The payment method code.
   * @throws {TripayError} Throws an error if the code parameter is incorrect.
   * @return {Promise<IPaymentChannel[]>} Returns a promise that resolves to an array of payment channels.
   * @see [Payment Channels - Tripay](https://tripay.co.id/developer?tab=merchant-payment-channel)
   */
  async paymentChannel(code?: PaymentMethod): Promise<IPaymentChannel[]> {
    if (code && isPaymentMethod(code) === false) {
      throw new TripayError('Parameter code is incorrect')
    } else if (code) {
      this.request.setParams({
        code,
      })
    }

    const result = await this.request.fetch('merchant/payment-channel')
    return result.data as IPaymentChannel[]
  }

  /**
   * Getting the transaction fee calculation details for each channel based on the specified amount.
   *
   * @param {number} amount - The amount for which to calculate the fee.
   * @param {PaymentMethod} [code] - The payment method code. Optional.
   * @throws {TripayError} Throws an error if the code parameter is provided but is not a valid payment method.
   * @return {Promise<IFeeCalc[]>} Returns a promise that resolves to an array of IFeeCalc objects representing the calculated fees.
   * @see [Fee Calculator - Tripay](https://tripay.co.id/developer?tab=merchant-fee-calculator)
   */
  async feeCalc(amount: number, code?: PaymentMethod): Promise<IFeeCalc[]> {
    if (code && isPaymentMethod(code) === false) {
      throw new TripayError('Parameter code is incorrect')
    } else if (code) {
      this.request.setParams({
        code,
      })
    }

    this.request.setParams({
      amount: amount.toString(),
    })

    const result = await this.request.fetch('merchant/fee-calculator')
    return result.data as IFeeCalc[]
  }

  /**
   * To obtain a list of merchant transactions.
   *
   * @param {TransactionParams} params - Optional parameters for the transaction request.
   * @throws {TripayError} Throws an error if the method parameter is provided but is not a valid payment method.
   * @return {Promise<ITransactions>} A promise that resolves to the transactions and pagination information.
   * @see [Transactions List](https://tripay.co.id/developer?tab=merchant-transactions)
   */
  async transactions(params?: TransactionParams): Promise<ITransactions> {
    if (params?.method && isPaymentMethod(params.method) === false) {
      throw new TripayError('Parameter method is incorrect')
    }

    // Set the request parameters
    this.request.setParams({
      page: params?.page?.toString(), // Convert the page number to string
      per_page: params?.per_page?.toString(), // Convert the number of transactions per page to string
      sort: params?.sort, // Set the sorting parameter
      reference: params?.reference, // Set the reference parameter
      merchant_ref: params?.merchant_ref, // Set the merchant reference parameter
      method: params?.method, // Set the method parameter
      status: params?.status, // Set the status parameter
    })

    // Fetch the transactions from the merchant endpoint
    const result = await this.request.fetch('merchant/transactions')

    // Return the transactions and pagination information
    return {
      data: result.data as ITransaction[], // Cast the transaction data to the correct type
      pagination: result.pagination ?? {
        // Set the pagination information
        current_page: 1,
        last_page: 1,
        next_page: 1,
        offset: {
          from: 0,
          to: 1,
        },
        per_page: 1,
        previous_page: 1,
        sort: 'asc',
        total_records: 1,
      },
    }
  }
}
