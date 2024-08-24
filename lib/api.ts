import { ApiClient } from '@/api/ApiClient'
import { BACKEND_HOST } from './constants/config'


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
