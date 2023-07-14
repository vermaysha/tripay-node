import { PaymentMethod } from '../payment'

export interface ISignatureParams {
  privateKey: string
  merchantCode: string
  merchantRef: string
  amount?: number
  channel?: PaymentMethod
}
