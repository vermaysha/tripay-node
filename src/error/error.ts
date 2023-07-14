import { ErrorResponse } from './error.interface'

/**
 * Represents a custom error class for Tripay-related errors.
 * Extends the built-in Error class.
 */
export class TripayError extends Error {
  /**
   * The error message associated with the TripayError instance.
   */
  readonly message: string

  /**
   * *The name of the TripayError instance.
   */
  readonly name: string

  /**
   * Represents a response object.
   *
   * @property {boolean} success - Indicates if the response was successful.
   * @property {string} message - The message associated with the response.
   */
  readonly response?: ErrorResponse

  /**
   * Constructs a new TripayError object with the given error message.
   * @param message - The error message to be associated with this TripayError instance.
   * */
  constructor(message: string, response?: ErrorResponse) {
    super(message)

    this.message = message
    this.name = 'TripayError'
    this.response = response

    // Capture the stack trace for debugging purposes
    Error.captureStackTrace(this, this.constructor)
  }
}
