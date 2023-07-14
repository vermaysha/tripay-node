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

export class ClosedTransaction {
  private request: HTTPRequest
  private privateKey: string
  private merchantCode: string

  private orderItems: IOrderItem[] = []

  constructor(options: TransactionOptions) {
    this.request = new HTTPRequest({
      apiToken: options.apiToken,
      sandbox: options.sandbox ?? false,
    })
    this.privateKey = options.privateKey
    this.merchantCode = options.merchantCode
  }

  addOrderItem(orderItem: IOrderItem): ClosedTransaction {
    this.orderItems.push(orderItem)
    return this
  }

  addOrderItems(orderItem: IOrderItem[]): ClosedTransaction {
    this.orderItems = [...this.orderItems, ...orderItem]
    return this
  }

  async create(params: IClosedPaymentParams): Promise<IClosedTransaction> {
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

    const signature = Signature.generate({
      amount,
      merchantRef: merchant_ref,
      merchantCode: this.merchantCode,
      privateKey: this.privateKey,
    })

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

    this.orderItems = []

    const res = await this.request.fetch('transaction/create', 'POST')

    return res.data as IClosedTransaction
  }

  async detail(reference: string): Promise<IClosedTransactionDetail> {
    this.request.setParams({
      reference,
    })

    const res = await this.request.fetch('transaction/detail', 'GET')

    return res.data as IClosedTransactionDetail
  }
}
