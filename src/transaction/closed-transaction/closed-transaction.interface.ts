import { IOrderItem } from '../../merchant'
import {
  IPaymentInstruction,
  PaymentStatus,
  PaymentMethod,
} from '../../payment'
import { IBaseTransaction } from '../transaction.interface'

export interface IClosedTransaction extends IBaseTransaction {
  reference: string
  payment_selection_type: string
  customer_email: string
  customer_phone: null | string
  callback_url: null | string
  return_url: null | string
  amount: number
  fee_merchant: number
  fee_customer: number
  total_fee: number
  amount_received: number
  checkout_url: string
  status: PaymentStatus
  expired_time: number
  order_items: IOrderItem[]
  instructions: IPaymentInstruction[]
  pay_url: null | string
}

export interface IClosedTransactionDetail extends IClosedTransaction {
  paid_at: string
  pay_url: string
}

export interface IClosedPaymentParams {
  method: PaymentMethod
  merchant_ref: string
  amount: number
  customer_name: string
  customer_email: string
  customer_phone: string
  callback_url?: string
  return_url?: string
  expired_time?: number
}
