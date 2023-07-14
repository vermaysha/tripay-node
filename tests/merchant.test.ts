import test from 'ava'
import { Merchant } from '../src/merchant/merchant'
import { TripayError } from '../src/error'

// Create a new instance of the Merchant class
const merchant = new Merchant({
  apiToken: process.env.API_TOKEN ?? '',
  sandbox: true,
})

/**
 * Test case for paymentChannel() function.
 * It should return a valid response.
 */
test('paymentChannel() should return valid response', async (t) => {
  // Retrieve the payment channels
  const channels = await merchant.paymentChannel()

  // Iterate over each channel
  channels.forEach((channel) => {
    // Assert the type of each property of the channel object
    t.is(typeof channel.group, 'string') // Group should be a string
    t.is(typeof channel.code, 'string') // Code should be a string
    t.is(typeof channel.name, 'string') // Name should be a string
    t.is(typeof channel.type, 'string') // Type should be a string
    t.is(typeof channel.icon_url, 'string') // Icon URL should be a string
    t.is(typeof channel.active, 'boolean') // Active should be a boolean
    t.is(typeof channel.fee_merchant, 'object') // Fee merchant should be an object
    t.is(typeof channel.fee_customer, 'object') // Fee customer should be an object
    t.is(typeof channel.total_fee, 'object') // Total fee should be an object

    // Assert the type of each property of the fee_merchant object
    t.is(typeof channel.fee_merchant.flat, 'number') // Flat fee of merchant should be a number
    t.is(typeof channel.fee_merchant.percent, 'number') // Percent fee of merchant should be a number

    // Assert the type of each property of the fee_customer object
    t.is(typeof channel.fee_customer.flat, 'number') // Flat fee of customer should be a number
    t.is(typeof channel.fee_customer.percent, 'number') // Percent fee of customer should be a number

    // Assert the type of each property of the total_fee object
    t.is(typeof channel.total_fee.flat, 'number') // Flat total fee should be a number
    t.is(typeof channel.total_fee.percent, 'string') // Percent total fee should be a string

    // Assert the type of the minimum_fee property if it exists
    if (channel.minimum_fee === null) {
      t.is(channel.minimum_fee, null) // Minimum fee should be null
    } else {
      t.is(typeof channel.minimum_fee, 'number') // Minimum fee should be a number
    }

    // Assert the type of the maximum_fee property if it exists
    if (channel.maximum_fee === null) {
      t.is(channel.maximum_fee, null) // Maximum fee should be null
    } else {
      t.is(typeof channel.maximum_fee, 'number') // Maximum fee should be a number
    }

    // Assert that the keys of the channel object are as expected
    t.deepEqual(
      Object.keys(channel).sort(),
      [
        'group',
        'code',
        'name',
        'type',
        'fee_merchant',
        'fee_customer',
        'total_fee',
        'minimum_fee',
        'maximum_fee',
        'icon_url',
        'active',
      ].sort(),
    )

    // Assert that the keys of the fee_customer object are as expected
    t.deepEqual(Object.keys(channel.fee_customer).sort(), ['flat', 'percent'])

    // Assert that the keys of the fee_merchant object are as expected
    t.deepEqual(Object.keys(channel.fee_merchant).sort(), ['flat', 'percent'])

    // Assert that the keys of the total_fee object are as expected
    t.deepEqual(Object.keys(channel.total_fee).sort(), ['flat', 'percent'])
  })
})

test('paymentChannel(): should throw an error', async (t) => {
  await t.throwsAsync(
    async () => {
      await merchant.paymentChannel('custom' as any)
    },
    {
      instanceOf: TripayError,
    },
  )
})

/**
 * Test case for feeCalc() function.
 * It should return a valid response.
 */
test('feeCalc() should return valid response', async (t) => {
  const results = await merchant.feeCalc(100, 'BRIVA')

  results.forEach((result) => {
    // Assert the type of the code property
    t.is(typeof result.code, 'string')

    // Assert the type of the name property
    t.is(typeof result.name, 'string')

    // Assert the type of the fee and total_fee properties
    t.is(typeof result.fee, 'object')
    t.is(typeof result.total_fee, 'object')

    // Assert the type of the fee.flat and fee.percent properties
    t.is(typeof result.fee.flat, 'number')
    t.is(typeof result.fee.percent, 'string')

    // Assert the type of the fee.min property if it exists
    if (result.fee.min === null) {
      t.is(result.fee.min, null)
    } else {
      t.is(typeof result.fee.min, 'number')
    }

    // Assert the type of the fee.max property if it exists
    if (result.fee.max === null) {
      t.is(result.fee.max, null)
    } else {
      t.is(typeof result.fee.max, 'number')
    }

    // Assert the type of the total_fee.merchant and total_fee.customer properties
    t.is(typeof result.total_fee.merchant, 'number')
    t.is(typeof result.total_fee.customer, 'number')

    // Assert the keys of the result object
    t.deepEqual(
      Object.keys(result).sort(),
      ['code', 'name', 'fee', 'total_fee'].sort(),
    )

    // Assert the keys of the fee object
    t.deepEqual(
      Object.keys(result.fee).sort(),
      ['flat', 'percent', 'min', 'max'].sort(),
    )

    // Assert the keys of the total_fee object
    t.deepEqual(
      Object.keys(result.total_fee).sort(),
      ['merchant', 'customer'].sort(),
    )
  })
})

test('feeCalc(): should throw an error', async (t) => {
  await t.throwsAsync(
    async () => {
      await merchant.feeCalc(100, 'custom' as any)
    },
    {
      instanceOf: TripayError,
    },
  )
})

/**
 * Test case for checking the validity of the response returned by the transactions() function.
 */
test('transactions() should return valid response', async (t) => {
  const transactions = await merchant.transactions()

  t.is(typeof transactions, 'object')

  transactions.data.forEach((transaction) => {
    t.is(typeof transaction.reference, 'string')
    t.is(typeof transaction.merchant_ref, 'string')
    t.is(typeof transaction.payment_selection_type, 'string')
    t.is(typeof transaction.payment_method, 'string')
    t.is(typeof transaction.payment_name, 'string')
    t.is(typeof transaction.customer_name, 'string')
    t.is(typeof transaction.customer_email, 'string')
    t.is(typeof transaction.amount, 'number')
    t.is(typeof transaction.fee_merchant, 'number')
    t.is(typeof transaction.fee_customer, 'number')
    t.is(typeof transaction.total_fee, 'number')
    t.is(typeof transaction.amount_received, 'number')
    if (transaction.pay_code) {
      t.is(typeof transaction.pay_code, 'string')
    } else {
      t.is(typeof transaction.pay_code, 'object')
    }
    t.is(typeof transaction.checkout_url, 'string')
    t.is(typeof transaction.status, 'string')
    t.is(typeof transaction.created_at, 'number')
    t.is(typeof transaction.expired_at, 'number')

    transaction.order_items.forEach((item) => {
      t.is(typeof item.name, 'string')
      t.is(typeof item.price, 'number')
      t.is(typeof item.quantity, 'number')
      t.is(typeof item.subtotal, 'number')

      t.true(typeof item.sku === 'string' || typeof item.sku === 'object')

      t.deepEqual(
        Object.keys(item).sort(),
        ['name', 'price', 'quantity', 'subtotal', 'sku'].sort(),
      )
    })

    if (transaction.paid_at === null) {
      t.is(typeof transaction.paid_at, 'object')
    } else {
      t.is(typeof transaction.paid_at, 'number')
    }

    if (transaction.note === null) {
      t.is(typeof transaction.note, 'object')
    } else {
      t.is(typeof transaction.note, 'string')
    }

    if (transaction.pay_url === null) {
      t.is(typeof transaction.pay_url, 'object')
    } else {
      t.is(typeof transaction.pay_url, 'string')
    }

    if (transaction.customer_phone === null) {
      t.is(typeof transaction.customer_phone, 'object')
    } else {
      t.is(typeof transaction.customer_phone, 'string')
    }

    if (transaction.callback_url === null) {
      t.is(typeof transaction.callback_url, 'object')
    } else {
      t.is(typeof transaction.callback_url, 'string')
    }

    if (transaction.return_url === null) {
      t.is(typeof transaction.return_url, 'object')
    } else {
      t.is(typeof transaction.return_url, 'string')
    }

    t.deepEqual(
      Object.keys(transaction).sort(),
      [
        'reference',
        'merchant_ref',
        'payment_selection_type',
        'payment_method',
        'payment_name',
        'customer_name',
        'customer_email',
        'customer_phone',
        'callback_url',
        'return_url',
        'amount',
        'fee_merchant',
        'fee_customer',
        'total_fee',
        'amount_received',
        'pay_code',
        'pay_url',
        'checkout_url',
        'order_items',
        'status',
        'note',
        'created_at',
        'expired_at',
        'paid_at',
      ].sort(),
    )
  })

  t.is(typeof transactions.pagination.sort, 'string')
  t.is(typeof transactions.pagination.offset.from, 'number')
  t.is(typeof transactions.pagination.offset.to, 'number')
  t.is(typeof transactions.pagination.current_page, 'number')
  t.is(typeof transactions.pagination.last_page, 'number')
  t.is(typeof transactions.pagination.per_page, 'number')
  t.is(typeof transactions.pagination.total_records, 'number')

  t.is(
    typeof transactions.pagination.previous_page,
    transactions.pagination.previous_page === null ? 'object' : 'number',
  )
  t.is(
    typeof transactions.pagination.next_page,
    transactions.pagination.next_page === null ? 'object' : 'number',
  )
})

test('transactions(): should throw an error', async (t) => {
  await t.throwsAsync(
    async () => {
      await merchant.transactions({
        method: 'custom' as any,
      })
    },
    {
      instanceOf: TripayError,
    },
  )
})
