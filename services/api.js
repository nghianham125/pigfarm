// import axios from 'axios';

// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// const updateAxiosHeader = () => {
//     if (typeof window !== 'undefined') {
//         const accessToken = localStorage.getItem('accessToken');
//         if (accessToken) {
//             api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//         }
//     }
// };

// if (typeof window !== 'undefined') {
//     updateAxiosHeader();
// }

// api.interceptors.response.use(
//     response => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 if (typeof window !== 'undefined') {
//                     const refreshToken = localStorage.getItem('refreshToken');
//                     const response = await axios.post(
//                         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/refresh-token`,
//                         { token: refreshToken }
//                     );

//                     const newAccessToken = response.data.data.accessToken;
//                     localStorage.setItem('accessToken', newAccessToken);

//                     api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//                     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//                     return api(originalRequest);
//                 }
//             } catch (refreshError) {
//                 console.error('Refresh token thất bại', refreshError);
//                 if (typeof window !== 'undefined') {
//                     window.location.href = '/login';
//                 }
//             }
//         }

//         if (error.response?.status === 404) {
//             console.error("Tài nguyên không tồn tại.");
//         }

//         return Promise.reject(error);
//     }
// );

// export default api;