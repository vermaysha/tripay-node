export interface PaymentInstructionParams {
  code: PaymentMethod
  pay_code?: string
  amount?: number
  allow_html?: boolean
}

export interface IPaymentInstruction {
  title: string
  steps: string[]
}

export type PaymentStatus = 'UNPAID' | 'PAID' | 'REFUND' | 'EXPIRED' | 'FAILED'

/**
 * Represents the available payment methods.
 */
export type PaymentMethod =
  | 'MYBVA' // My BVA payment method
  | 'PERMATAVA' // Permata VA payment method
  | 'BNIVA' // BNI VA payment method
  | 'BRIVA' // BRI VA payment method
  | 'MANDIRIVA' // Mandiri VA payment method
  | 'BCAVA' // BCA VA payment method
  | 'SMSVA' // SMS VA payment method
  | 'MUAMALATVA' // Muamalat VA payment method
  | 'CIMBVA' // CIMB VA payment method
  | 'BSIVA' // BSI VA payment method
  | 'OCBCVA' // OCBC VA payment method
  | 'DANAMONVA' // Danamon VA payment method
  | 'BNCVA' // BNC VA payment method
  | 'BSIVAOP' // BSI VA OP payment method
  | 'ALFAMART' // Alfamart payment method
  | 'INDOMARET' // Indomaret payment method
  | 'ALFAMIDI' // Alfamidi payment method
  | 'OVO' // OVO payment method
  | 'QRIS' // QRIS payment method
  | 'QRISC' // QRIS C payment method
  | 'QRIS2' // QRIS 2 payment method
  | 'SHOPEEPAY' // Shopeepay payment method
  | 'QRIS_SHOPEEPAY' // QRIS Shopeepay payment method
