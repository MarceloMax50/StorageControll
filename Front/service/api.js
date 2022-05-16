import axios from 'axios';

const api = axios.create(
    {
        // baseURL: 'http://192.168.1.10:3000',
        //baseURL :'http://10.2.17.104:3000',
        //baseURL: 'http://192.168.15.42:3000'
        baseURL: 'http://192.168.15.42:3000'
    }
);

export default api;