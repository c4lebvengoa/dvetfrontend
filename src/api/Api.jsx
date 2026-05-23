import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api', // Asegúrate de apuntar a tu puerto de Spring Boot
});

// Adjuntar automáticamente el token de manera transparente en las cabeceras
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;