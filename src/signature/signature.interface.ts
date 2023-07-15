import { PaymentMethod } from '../payment'

/**
 * Interface for signature parameters.
 */
export interface ISignatureParams {
  /**
   * The private key.
   */
  privateKey: string

  /**
   * The merchant code.
   */
  merchantCode: string

  /**
   * The merchant reference.
   */
  merchantRef: string

  /**
   * The amount (optional).
   */
  amount?: number

  /**
   * The payment method channel (optional).
   */
  channel?: PaymentMethod
}
