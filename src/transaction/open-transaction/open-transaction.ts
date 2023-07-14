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

export class OpenTransaction {
  private request: HTTPRequest
  private privateKey: string
  private merchantCode: string

  constructor(options: TransactionOptions) {
    this.request = new HTTPRequest({
      apiToken: options.apiToken,
      sandbox: options.sandbox ?? false,
    })
    this.privateKey = options.privateKey
    this.merchantCode = options.merchantCode
  }

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

  async detail(uuid: string): Promise<IOpenTransaction> {
    const res = await this.request.fetch(`open-payment/${uuid}/detail`)

    return res.data as IOpenTransaction
  }

  async list(
    uuid: string,
    params: IOpenPaymentListParams,
  ): Promise<IOpenTransactionLists> {
    const { reference, start_date, end_date, per_page } = params

    if (per_page && per_page > 100) {
      throw new TripayError(
        'Parameter per_page is too big, maximum is 100 item per_page',
      )
    }

    this.request.setParams({
      reference,
      start_date: start_date ? this.formatDateTime(start_date) : undefined,
      end_date: end_date ? this.formatDateTime(end_date) : undefined,
      per_page,
    })

    const res = await this.request.fetch(`open-payment/${uuid}/transactions`)
    const data = res.data as IOpenTransactionList[]

    return {
      data,
      pagination: res.pagination,
    } as IOpenTransactionLists
  }

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
