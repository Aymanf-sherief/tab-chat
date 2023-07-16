/* config from env variables
 * see .env.example
 * see https://vitejs.dev/guide/env-and-mode.html
 */

export const config = {
  usersApiUrl: import.meta.env.VITE_USERS_API_URL,
  corsProxyUr: import.meta.env.VITE_CORS_PROXY_URL,
};
