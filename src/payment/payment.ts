import { TripayError } from '../error'
import { BaseOptions } from '../global'
import { isPaymentMethod } from './payment.helper'
import { HTTPRequest } from '../request'
import {
  IPaymentInstruction,
  PaymentInstructionParams,
} from './payment.interface'

/**
 * The class that contains methods to obtain information about payments.
 *
 */
export class Payment {
  private request: HTTPRequest

  /**
   * Constructs a new instance of the class.
   * @param {BaseOptions} options - The options for the class.
   */
  constructor(options: BaseOptions) {
    this.request = new HTTPRequest({
      apiToken: options.apiToken,
      sandbox: options.sandbox ?? false,
    })
  }

  /**
   * Fetching payment instructions from each channel.
   *
   * @param {PaymentInstructionParams} params - The parameters for retrieving payment instructions.
   * @throws {TripayError} Throws an error if the method parameter is provided but is not a valid payment method.
   * @returns {Promise<IPaymentInstruction[]>} - A promise that resolves to an array of payment instructions.
   * @see [Payment Instructions - Tripay](https://tripay.co.id/developer?tab=payment-instruction)
   */
  async instructions(
    params: PaymentInstructionParams,
  ): Promise<IPaymentInstruction[]> {
    if (params?.code && isPaymentMethod(params.code) === false) {
      throw new TripayError('Parameter method is incorrect')
    }

    this.request.setParams({
      code: params.code,
      pay_code: params.pay_code,
      amount: params.amount,
      allow_html: params.allow_html,
    })

    const response = await this.request.fetch('payment/instruction')

    return response.data as IPaymentInstruction[]
  }
}
