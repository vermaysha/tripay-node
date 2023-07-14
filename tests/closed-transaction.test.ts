import test from 'ava'
import { ClosedTransaction } from '../src/transaction/closed-transaction'
import { TripayError } from '../src/error'
import { randomUUID } from 'crypto'

const transaction = new ClosedTransaction({
  apiToken: process.env.API_TOKEN ?? '',
  merchantCode: process.env.MERCHANT_CODE ?? '',
  privateKey: process.env.PRIVATE_KEY ?? '',
  sandbox: true,
})

// test('create(): should return a valid response', async (t) => {
//   transaction.addOrderItem({
//     name: 'Ava Test',
//     price: 20000,
//     quantity: 1,
//     sku: randomUUID(),
//     subtotal: 20000,
//     image_url: 'http://image.com',
//     product_url: 'http://product.com',
//   })
//   const res = await transaction.create({
//     method: 'BNIVA',
//     merchant_ref: randomUUID(),
//     amount: 20000,
//     customer_name: 'Ava Test',
//     customer_email: 'test@ava.com',
//     customer_phone: '0879798783634',
//     callback_url: 'http://callback.com',
//     return_url: 'http://return.com',
//   })

//   t.is(typeof res, 'object')

//   t.is(typeof res.reference, 'string')
//   t.is(typeof res.payment_selection_type, 'string')
//   t.is(typeof res.customer_email, 'string')
//   t.true(res.customer_phone === null || typeof res.customer_phone === 'string')
//   t.true(res.callback_url === null || typeof res.callback_url === 'string')
//   t.true(res.return_url === null || typeof res.return_url === 'string')
//   t.is(typeof res.amount, 'number')
//   t.is(typeof res.fee_merchant, 'number')
//   t.is(typeof res.fee_customer, 'number')
//   t.is(typeof res.total_fee, 'number')
//   t.is(typeof res.amount_received, 'number')
//   t.is(typeof res.checkout_url, 'string')
//   t.is(typeof res.status, 'string')
//   t.is(typeof res.expired_time, 'number')

//   t.is(typeof res.merchant_ref, 'string')
//   t.is(typeof res.customer_name, 'string')
//   t.is(typeof res.payment_name, 'string')
//   t.is(typeof res.payment_method, 'string')
//   t.is(typeof res.pay_code, 'string')
//   t.true(res.pay_url == null || typeof res.pay_url === 'string')

//   t.true(res.qr_string == null || typeof res.qr_string === 'string')
//   t.true(res.qr_url == null || typeof res.qr_url === 'string')

//   let expected = [
//     'reference',
//     'payment_selection_type',
//     'customer_email',
//     'customer_phone',
//     'callback_url',
//     'return_url',
//     'amount',
//     'fee_merchant',
//     'fee_customer',
//     'total_fee',
//     'amount_received',
//     'checkout_url',
//     'status',
//     'expired_time',
//     'order_items',
//     'instructions',
//     'merchant_ref',
//     'customer_name',
//     'payment_name',
//     'payment_method',
//     'pay_code',
//     'pay_url'
//   ]

//   if (res.qr_string && res.qr_url) {
//     expected = [...expected, 'qr_string', 'qr_url']
//   }

//   t.deepEqual(
//     Object.keys(res).sort(),
//     expected.sort(),
//   )

//   res.order_items.forEach((item) => {
//     t.is(typeof item.name, 'string')
//     t.is(typeof item.price, 'number')
//     t.is(typeof item.quantity, 'number')
//     t.is(typeof item.subtotal, 'number')
//     t.is(typeof item.image_url, 'string')
//     t.is(typeof item.product_url, 'string')

//     if (item.sku === null) {
//       t.is(typeof item.sku, 'object')
//     } else {
//       t.is(typeof item.sku, 'string')
//     }

//     t.deepEqual(
//       Object.keys(item).sort(),
//       ['name', 'price', 'quantity', 'subtotal', 'sku', 'image_url', 'product_url'].sort(),
//     )
//   })

//   res.instructions.forEach((instruction) => {
//     t.is(typeof instruction.steps, 'object')
//     t.is(typeof instruction.title, 'string')

//     instruction.steps.forEach((step) => {
//       t.is(typeof step, 'string')
//     })

//     t.deepEqual(Object.keys(instruction).sort(), ['title', 'steps'].sort())
//   })
// })

test('create(): should throw an error', async (t) => {
  await t.throwsAsync(
    async () => {
      await transaction.create({
        method: 'BRIVA',
        merchant_ref: randomUUID(),
        amount: 20000,
        customer_name: 'Ava Test',
        customer_email: 'test@ava.com',
        customer_phone: '0879798783634',
        callback_url: 'http://callback.com',
        return_url: 'http://return.com',
      })
    },
    {
      instanceOf: TripayError,
    },
  )
})

test('detail(): should return a valid response', async (t) => {
  const res = await transaction.detail('DEV-T1535102099KE9QN')

  t.is(typeof res, 'object')

  t.is(typeof res.reference, 'string')
  t.is(typeof res.payment_selection_type, 'string')
  t.is(typeof res.customer_email, 'string')
  t.true(res.customer_phone === null || typeof res.customer_phone === 'string')
  t.true(res.callback_url === null || typeof res.callback_url === 'string')
  t.true(res.return_url === null || typeof res.return_url === 'string')
  t.is(typeof res.amount, 'number')
  t.is(typeof res.fee_merchant, 'number')
  t.is(typeof res.fee_customer, 'number')
  t.is(typeof res.total_fee, 'number')
  t.is(typeof res.amount_received, 'number')
  t.is(typeof res.checkout_url, 'string')
  t.is(typeof res.status, 'string')
  t.is(typeof res.expired_time, 'number')

  t.is(typeof res.merchant_ref, 'string')
  t.is(typeof res.customer_name, 'string')
  t.is(typeof res.payment_name, 'string')
  t.is(typeof res.payment_method, 'string')
  t.is(typeof res.pay_code, 'string')
  t.true(res.paid_at === null || typeof res.paid_at === 'string')
  t.true(res.pay_url == null || typeof res.pay_url === 'string')

  t.true(res.qr_string == null || typeof res.qr_string === 'string')
  t.true(res.qr_url == null || typeof res.qr_url === 'string')

  let expected: string[] = [
    'reference',
    'payment_selection_type',
    'customer_email',
    'customer_phone',
    'callback_url',
    'return_url',
    'amount',
    'fee_merchant',
    'fee_customer',
    'total_fee',
    'amount_received',
    'checkout_url',
    'status',
    'expired_time',
    'order_items',
    'instructions',
    'merchant_ref',
    'customer_name',
    'payment_name',
    'payment_method',
    'pay_code',
    'paid_at',
    'pay_url',
  ]

  if (res.qr_string && res.qr_url) {
    expected = [...expected, 'qr_string', 'qr_url']
  }

  t.deepEqual(Object.keys(res).sort(), expected.sort())

  res.order_items.forEach((item) => {
    t.is(typeof item.name, 'string')
    t.is(typeof item.price, 'number')
    t.is(typeof item.quantity, 'number')
    t.is(typeof item.subtotal, 'number')
    t.is(typeof item.image_url, 'string')
    t.is(typeof item.product_url, 'string')

    if (item.sku === null) {
      t.is(typeof item.sku, 'object')
    } else {
      t.is(typeof item.sku, 'string')
    }

    t.deepEqual(
      Object.keys(item).sort(),
      [
        'name',
        'price',
        'quantity',
        'subtotal',
        'sku',
        'image_url',
        'product_url',
      ].sort(),
    )
  })

  res.instructions.forEach((instruction) => {
    t.is(typeof instruction.steps, 'object')
    t.is(typeof instruction.title, 'string')

    instruction.steps.forEach((step) => {
      t.is(typeof step, 'string')
    })

    t.deepEqual(Object.keys(instruction).sort(), ['title', 'steps'].sort())
  })
})
