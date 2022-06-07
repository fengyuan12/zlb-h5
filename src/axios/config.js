
import { VUE_APP_API_BASE_URL } from '@/config'
const config = {
  baseURL: VUE_APP_API_BASE_URL,
  timeout: 60 * 5000, // 响应过期时间
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
}

export default config
