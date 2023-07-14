import fetch, { HeadersInit, RequestInit } from 'node-fetch'
import {
  HTTPParams,
  RequestOptions,
  ITripayResponse,
  HTTPBody,
} from './request.interface'
import { version } from '../../package.json'
import { TripayError } from '../error'

/**
 * HTTPRequest class for making HTTP requests to the Tripay API.
 */
export class HTTPRequest {
  private body: HTTPBody = {}
  private params: HTTPParams = {}
  private apiToken?: string
  private baseUrl: string

  /**
   * Constructs a new instance of the HTTPRequest class.
   *
   * @param {RequestOptions} options - The options for the HTTP request.
   * @property {string} apiToken - The Tripay API token.
   * @property {string} baseUrl - The base URL for the API.
   */
  constructor(options?: RequestOptions) {
    this.apiToken = options?.apiToken

    // Set the base URL based on the 'sandbox' option
    this.baseUrl = options?.sandbox
      ? 'https://tripay.co.id/api-sandbox/'
      : 'https://tripay.co.id/api/'
  }

  /**
   * Sets the body of the function.
   *
   * @param {HTTPBody} body - The body to be set.
   * @return {HTTPRequest} This function does not return a value.
   */
  setBody(body: HTTPBody): HTTPRequest {
    this.body = body
    return this
  }

  /**
   * Sets the params for the HTTPRequest.
   *
   * @param {HTTPParams} params - The params to be set.
   * @return {HTTPRequest} - The updated HTTPRequest.
   */
  setParams(params: HTTPParams): HTTPRequest {
    this.params = { ...this.params, ...params }
    return this
  }

  /**
   * Generates a user agent string for the current environment.
   *
   * @return {string} The generated user agent string.
   */
  private generateUserAgent(): string {
    return `tripay-node/${version} (${process.version} ${process.platform} ${process.arch})`
  }

  /**
   * Removes undefined values from an object and converts other values to strings.
   * @param obj - The object to remove undefined values from.
   * @returns A new object with undefined values removed and other values converted to strings.
   */
  private removeUndefinedValues(
    obj: Record<string, any>,
  ): Record<string, string> {
    return Object.entries(obj).reduce<Record<string, any>>(
      (result, [key, value]) => {
        if (value === false) {
          result[key] = '0'
        }
        if (value === true) {
          result[key] = '1'
        }
        if (value === null) {
          result[key] = ''
        }
        if (value !== undefined) {
          result[key] = String(value).toString()
        }
        if (Array.isArray(value)) {
          result[key] = value.map((item) => {
            if (typeof value === 'object') {
              return this.removeUndefinedValues(item)
            }

            return value
          })
        }
        return result
      },
      {},
    )
  }

  /**
   * Fetches data asynchronously from the given URL.
   *
   * @param {string} url - The URL to fetch data from.
   * @param {string} method - The HTTP method to use for the request. Can be 'GET' or 'POST'.
   * @return {Promise<ITripayResponse>} A Promise that resolves to a ITripayResponse object.
   * @throws {TripayError} If the request failed.
   */
  async fetch(
    url: string,
    method: 'GET' | 'POST' = 'GET',
  ): Promise<ITripayResponse> {
    // Create the full URL by appending the base URL to the given URL
    const fullUrl = new URL(url, this.baseUrl)

    // Remove any undefined values from the params object
    const params = this.removeUndefinedValues(this.params)

    // Append the query parameters to the URL
    fullUrl.search = new URLSearchParams(params).toString()

    const headers: HeadersInit = {
      // Add the authorization token to the headers
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'User-Agent': this.generateUserAgent(),
    }

    if (this.apiToken) {
      headers.Authorization = `Bearer ${this.apiToken}`
    }

    // Set up the options for the fetch request
    const options: RequestInit = {
      method,
      headers,
    }

    // Set the request body if the method is 'POST'
    if (method === 'POST') {
      options.body = JSON.stringify(this.body)
    }

    // Send the fetch request and wait for the response
    const res = await fetch(fullUrl, options)

    // Parse the response as JSON and cast it to the ITripayResponse type
    const data = (await res.json()) as ITripayResponse

    // Check if the request was successful
    if (!data.success) {
      // Throw an error with the error message from the response
      throw new TripayError(`Request failed: ${data.message}`, {
        success: false,
        message: data.message,
      })
    }

    // Reset the body and params for the next request
    this.body = {}
    this.params = {}

    // Return the data as a ITripayResponse object
    return data
  }
}
