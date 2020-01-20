import axios from 'axios';

//  axios.defaults.headers = {
//      'Access-Control-Allow-Origin': '*'
//  }

const instance = axios.create({
    baseURL: 'http://localhost:8000'
})

export const axiosClient = instance;
