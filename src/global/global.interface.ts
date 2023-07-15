/**
 * Represents the options for the API.
 */
export interface BaseOptions {
  /**
   * The API token to be used.
   */
  apiToken: string

  /**
   * Specifies whether the sandbox mode should be enabled.
   * If true, the API will run in sandbox mode.
   * If false, the API will run in production mode.
   * Defaults to false.
   */
  sandbox?: boolean
}
