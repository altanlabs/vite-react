// import axios from 'axios';

// export const API_BASE = `${!!import.meta.env.VITE_BACKEND_DEV ? 'dev-' : ''}api.altan.ai`;
// export const API_BASE_URL = `https://${API_BASE}`;

// const AUTH_API_ENDPOINTS = {

// };

// export const refreshToken = async (axiosInstance) => {
//   try {
//     const instanceName = axiosInstance.defaults.name;
//     const refreshEndpoint = AUTH_API_ENDPOINTS[instanceName];
//     if (!refreshEndpoint) {
//       throw new Error('Invalid Axios instance');
//     }
//     const res = await axios.get(refreshEndpoint, { withCredentials: true });
//     const { user, token } = res.data;

//     return Promise.resolve({ user, accessToken: token.access_token });
//   } catch (e) {
//     return Promise.reject(e);
//   }
// };

// export const setSession = (accessToken, axiosInstance, request = null) => {
//   if (accessToken) {
//     if (request) {
//       request.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('oaiauth');
//     delete axiosInstance.defaults.headers.common.Authorization;
//   }
// };
