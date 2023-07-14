import test from 'ava'
import { Payment } from '../src/payment'
import { TripayError } from '../src/error'

const payment = new Payment({
  apiToken: process.env.API_TOKEN ?? '',
  sandbox: true,
})

test('instructions(): should return a valid response', async (t) => {
  const instructions = await payment.instructions({
    code: 'BRIVA',
  })

  t.is(typeof instructions, 'object')

  instructions.forEach((instruction) => {
    t.is(typeof instruction.steps, 'object')
    t.is(typeof instruction.title, 'string')

    instruction.steps.forEach((step) => {
      t.is(typeof step, 'string')
    })

    t.deepEqual(Object.keys(instruction).sort(), ['title', 'steps'].sort())
  })
})

test('instructions(): should throw an error', async (t) => {
  await t.throwsAsync(
    async () => {
      await payment.instructions({
        code: 'custom-code' as any,
      })
    },
    {
      instanceOf: TripayError,
    },
  )
})
