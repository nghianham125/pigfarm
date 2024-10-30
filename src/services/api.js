// import axios from 'axios';

// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Thêm access token vào header nếu có
// const updateAxiosHeader = () => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//         api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//     }
// };

// // Gọi ngay khi khởi tạo
// updateAxiosHeader();

// // Xử lý refresh token
// const handleRefreshToken = async () => {
//     try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (!refreshToken) {
//             throw new Error('No refresh token');
//         }

//         const response = await axios.post(
//             `${process.env.NEXT_PUBLIC_API_URL}/api/v1/refresh-token`,
//             { token: refreshToken },
//             {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

//         // Lưu token mới
//         localStorage.setItem('accessToken', newAccessToken);
//         if (newRefreshToken) {
//             localStorage.setItem('refreshToken', newRefreshToken);
//         }

//         // Cập nhật header
//         api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

//         return newAccessToken;
//     } catch (error) {
//         // Xóa hết token khi refresh thất bại
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         throw error;
//     }
// };

// // Xử lý interceptor
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         // Kiểm tra lỗi 401 và chưa retry
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // Thử refresh token
//                 const newAccessToken = await handleRefreshToken();

//                 // Cập nhật token cho request cũ
//                 originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//                 // Gửi lại request ban đầu
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 // Nếu refresh thất bại, chuyển về trang login
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default api; 