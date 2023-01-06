import axios from 'axios'
const { VITE_API_URL } = import.meta.env

export const api = axios.create({
    baseURL: VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// axios.defaults.headers.common['Authorization'] = 'Token'
api.interceptors.request.use(config => {  // Cada vez que se realiza una request se ejecuta esta funcion
    config.headers['authorization'] = localStorage.getItem('token')  // string or null
    return config
})

