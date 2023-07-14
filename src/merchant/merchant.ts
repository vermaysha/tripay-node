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

export class Merchant {
  private request: HTTPRequest

  constructor(options: BaseOptions) {
    this.request = new HTTPRequest({
      apiToken: options.apiToken,
      sandbox: options.sandbox ?? false,
    })
  }

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
