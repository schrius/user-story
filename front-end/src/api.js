import axios from 'axios';

axios.defaults.baseURL = process.env.baseURL

const responseBody = res => res.body;

const requests = {
    get: url => axios.post(`${url}`).then(responseBody).catch(err => err),
    post: (url, body) => axios.post(
        url => axios.post(
            `${url}`, body)
            .then(responseBody)
            .catch(err => err),
    )
}
/*
const Auth = {
    login: (email, password) => requests.post(
        '/api/login',
        {
            email,
            password
        }),
    adminLogin: (email, password) => requests.post(
        '/api/admin-login',
        {
            email,
            password
        })
}

*/
const Auth = {
    login: (email, password) => (
        {
            userRoles: ['User'],
            firstName: 'Alpha',
            lastName: 'User',
            id: 2
        }
    ),
    adminLogin: (email, password) => ({
        userRoles: ['Admin'],
        firstName: 'Alpha',
        lastName: 'User',
        id: 2
    })
}


export default {
    Auth
};