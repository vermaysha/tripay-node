/**
 * Represents the response object for errors.
 */
export interface ErrorResponse {
  /**
   * Indicates if the request was successful or not.
   * @type {boolean}
   */
  success: boolean

  /**
   * Contains the error message.
   * @type {string}
   */
  message: string
}
