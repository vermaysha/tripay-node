import { PaymentMethod, PaymentStatus } from '../payment'

export interface ICallback {
  reference: string
  merchant_ref: string
  payment_method: PaymentMethod
  payment_method_code: string
  total_amount: number
  fee_merchant: number
  fee_customer: number
  total_fee: number
  amount_received: number
  is_closed_payment: number
  status: PaymentStatus
  paid_at: number | null
  note: null | string
}
