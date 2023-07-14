import { PaymentStatus, PaymentMethod } from '../../payment'
import { ITripayPagination } from '../../request'
import { IBaseTransaction } from '../transaction.interface'

export interface IOpenTransaction extends IBaseTransaction {
  uuid: string
}

export interface IOpenTransactionList {
  reference: string
  merchant_ref: string
  payment_method: PaymentMethod
  payment_name: string
  customer_name: string
  amount: number
  fee_merchant: number
  fee_customer: number
  total_fee: number
  amount_received: number
  checkout_url: string
  status: PaymentStatus
  paid_at: number
}

export interface IOpenTransactionLists {
  data: IOpenTransactionList[]
  pagination: ITripayPagination
}

export interface IOpenPaymentParams {
  method: PaymentMethod
  merchant_ref: string
  customer_name: string
}

export interface IOpenPaymentListParams {
  reference?: string
  merchant_ref?: string
  start_date?: Date
  end_date?: Date
  per_page?: number
}
