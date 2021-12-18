import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://unsocial-app.herokuapp.com/api/"
})