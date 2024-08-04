import { ApiClient } from '@/api/ApiClient'
import { BACKEND_HOST } from './constants/config'

/**
 * Creates a new ApiClient instance with the specified configuration.
 *
 * @param accessToken - An optional access token to include in the Authorization header.
 * @returns A new ApiClient instance.
 */
const getApiClient = async (accessToken?: string | null) => {
  return new ApiClient({
    BASE: BACKEND_HOST,
    HEADERS: {
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`
      })
    }
  })
}

export { getApiClient }
