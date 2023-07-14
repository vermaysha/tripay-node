export interface ITripayPagination {
  sort: 'desc' | 'asc'
  offset: {
    from: number
    to: number
  }
  current_page: number
  previous_page: null | number
  next_page: null | number
  last_page: number
  per_page: number
  total_records: number
}
/**
 * Represents the response object returned by Tripay.
 */
export interface ITripayResponse {
  success: boolean // Indicates whether the request was successful or not.
  message: string // A descriptive message about the response.
  data: any // The data returned by Tripay.
  pagination?: ITripayPagination
}

/**
 * Represents the options for making a request to Tripay.
 */
export interface RequestOptions {
  apiToken?: string // The API token for authentication.
  sandbox: boolean // Indicates whether to use the sandbox environment or not.
}

export type HTTPParams = Record<
  string,
  string | readonly string[] | undefined | null | number | boolean
>
export type HTTPBody = Record<string, any>
