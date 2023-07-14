import { TripayError } from '../error'
import { BaseOptions } from '../global'
import { isPaymentMethod } from './payment.helper'
import { HTTPRequest } from '../request'
import {
  IPaymentInstruction,
  PaymentInstructionParams,
} from './payment.interface'

export class Payment {
  private request: HTTPRequest

  constructor(options: BaseOptions) {
    this.request = new HTTPRequest({
      apiToken: options.apiToken,
      sandbox: options.sandbox ?? false,
    })
  }

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
