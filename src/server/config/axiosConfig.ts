import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

// Add an interceptor to include the bearer token in headers
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
