import { PaymentMethod } from './payment.interface'

/**
 * Checks if the given code is a valid payment method.
 *
 * @param {string} code - The code to check.
 * @return {boolean} Returns true if the code is a valid payment method, otherwise false.
 */
export function isPaymentMethod(code: string): code is PaymentMethod {
  return (
    typeof code === 'string' &&
    [
      'MYBVA',
      'PERMATAVA',
      'BNIVA',
      'BRIVA',
      'MANDIRIVA',
      'BCAVA',
      'SMSVA',
      'MUAMALATVA',
      'CIMBVA',
      'BSIVA',
      'OCBCVA',
      'DANAMONVA',
      'BNCVA',
      'BSIVAOP',
      'ALFAMART',
      'INDOMARET',
      'ALFAMIDI',
      'OVO',
      'QRIS',
      'QRISC',
      'QRIS2',
      'SHOPEEPAY',
      'QRIS_SHOPEEPAY',
    ].includes(code)
  )
}
