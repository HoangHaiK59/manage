import axios from 'axios';

//  axios.defaults.headers = {
//      'Access-Control-Allow-Origin': '*'
//  }

const instance = axios.create({
    baseURL: 'https://bemanage.herokuapp.com'
})

export const axiosClient = instance;
