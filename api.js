// This legacy placeholder is not imported by the Next.js application. It must
// fail closed rather than impersonate an authenticated API client.
const unconfigured = async () => {
  throw new Error('No authenticated KFoods API client is configured.')
}

export const api = {
  get: unconfigured,
  post: unconfigured,
  put: unconfigured,
  delete: unconfigured,
  interceptors: {
    request: { use: unconfigured },
    response: { use: unconfigured },
  },
}

export const login = unconfigured
export const logout = unconfigured
export const getUserProfile = unconfigured

export default api
