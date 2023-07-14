import { PaymentMethod, PaymentStatus } from '../payment'
import { ITripayPagination } from '../request'

export interface IFeeCalc {
  code: string
  name: string
  fee: {
    flat: number
    percent: string
    min: number | null
    max: number | null
  }
  total_fee: {
    merchant: number
    customer: number
  }
}

export interface IPaymentChannel {
  group: string
  code: string
  name: string
  type: string
  fee_merchant: {
    flat: number
    percent: number
  }
  fee_customer: {
    flat: number
    percent: number
  }
  total_fee: {
    flat: number
    percent: string
  }
  minimum_fee: number | null
  maximum_fee: number | null
  icon_url: string
  active: boolean
}

export interface IOrderItem {
  sku: null | string
  name: string
  price: number
  quantity: number
  subtotal: null | number
  product_url: string | null
  image_url: string | null
}

export interface ITransaction {
  reference: string
  merchant_ref: string
  payment_selection_type: string
  payment_method: PaymentMethod
  payment_name: string
  customer_name: string
  customer_email: string
  customer_phone: null | string
  callback_url: null | string
  return_url: null | string
  amount: number
  fee_merchant: number
  fee_customer: number
  total_fee: number
  amount_received: number
  pay_code: null | string
  pay_url: null | string
  checkout_url: string
  order_items: Omit<IOrderItem, 'product_url' | 'image_url'>[]
  status: PaymentStatus
  note: null | string
  created_at: number
  expired_at: number
  paid_at: null | number
}

export interface ITransactions {
  data: ITransaction[]
  pagination: ITripayPagination
}

export interface TransactionParams {
  page?: number
  per_page?: number
  sort?: 'desc' | 'asc'
  reference?: string
  merchant_ref?: string
  method?: PaymentMethod
  status?: string
}
