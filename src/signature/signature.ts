import { ICallback } from '../callback'
import { ISignatureParams } from './signature.interface'
import { createHmac } from 'crypto'

/**
 * The class used to generate a signature before creating a transaction.
 */
export class Signature {
  /**
   * Generates a signature for a payment transaction.
   *
   * @param {ISignatureParams} options - The options object containing the required parameters.
   * @param {string} options.privateKey - The private key used for creating the signature.
   * @param {string} options.merchantCode - The merchant code.
   * @param {string} options.merchantRef - The merchant reference.
   * @param {number} options.amount - The payment amount.
   * @param {string} options.channel - The payment channel.
   * @throws {Error} Throws an error if either the amount or channel is not provided.
   * @return {string} The generated signature for the payment transaction.
   */
  static generate(options: ISignatureParams): string {
    const { privateKey, merchantCode, merchantRef, amount, channel } = options

    const x = amount ? amount.toString() : channel ? channel : null

    if (!x) {
      throw new Error('amount or channel is required')
    }

    return createHmac('sha256', privateKey)
      .update(merchantCode + merchantRef + x)
      .digest('hex')
  }

  /**
   * Generates the callback signature using the provided body and private key.
   *
   * @param {ICallback} body - The body of the callback.
   * @param {string} privateKey - The private key used for generating the signature.
   * @return {string} The generated callback signature.
   */
  static callbackSignature(body: ICallback, privateKey: string) {
    return createHmac('sha256', privateKey)
      .update(Buffer.from(body.toString()))
      .digest('hex')
  }
}
