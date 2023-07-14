import { ICallback } from '../callback'
import { ISignatureParams } from './signature.interface'
import { createHmac } from 'crypto'

export class Signature {
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

  static callbackSignature(body: ICallback, privateKey: string) {
    return createHmac('sha256', privateKey)
      .update(Buffer.from(body.toString()))
      .digest('hex')
  }
}
