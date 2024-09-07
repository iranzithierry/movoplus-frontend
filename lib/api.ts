import { ApiClient } from '@/api/ApiClient';
import { BACKEND_HOST, COOKIE_NAMES } from './constants/config';

let accessToken: string | null = null;

if (typeof window !== 'undefined') {
  accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${COOKIE_NAMES.ACCESS_TOKEN}=`))
    ?.split('=')[1] || null;
} else {
  accessToken = await import('next/headers').then(({ cookies }) => {
    const cookieValue = cookies().get(COOKIE_NAMES.ACCESS_TOKEN)?.value || null;
    return cookieValue;
  })
}
const apiClient = () => {
  return new ApiClient({
    BASE: BACKEND_HOST,
    HEADERS: {
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  });
};
const api = apiClient();
export default api;
