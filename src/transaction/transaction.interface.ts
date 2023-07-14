import { BaseOptions } from '../global'
import { PaymentMethod } from '../payment'

export interface IBaseTransaction {
  merchant_ref: string
  customer_name: string
  payment_name: string
  payment_method: PaymentMethod
  pay_code: string
  qr_string?: null | string
  qr_url?: null | string
}

export interface TransactionOptions extends BaseOptions {
  privateKey: string
  merchantCode: string
}
