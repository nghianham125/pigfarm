import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
});
const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
api.interceptors.response.use(
    response => response, // Trả về phản hồi nếu không có lỗi
    async (error) => {
        const originalRequest = error.config; // Lưu trữ request gốc

        // Xử lý lỗi 401 (Unauthorized)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Đánh dấu request đã thử làm mới token

            try {
                // Gọi API để làm mới token
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/refresh-token`, { token: refreshToken });

                // Lưu Access Token mới
                const newAccessToken = response.data.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                // Cập nhật Access Token vào header của Axios
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // Gửi lại request ban đầu với Access Token mới
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token thất bại', refreshError);
                window.location.href = '/login';
            }
        }
        if (error.response && error.response.status === 404) {
            console.error("Tài nguyên không tồn tại.");
        }
        return Promise.reject(error);
    }
);

export default api;