import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASEURL

var token = null
const instance = axios.create();

const requests = {
    post: (url, req) => {
        instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
        return instance.post(url,req)
    },
    get: (url) => {
        instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
        return instance.get(url);
    }
}

const Auth = {
    login: (email, password) => {
        const instance = axios.create()
        return instance.post(
            '/auth/login', {}, {auth: {
                username: email,
                password: password
            }})
    }
}

const Story = {
    createStory: (story) => requests.post('/story/createStory',story),
    getStory: () => requests.get('/story/get'),
    listStory: () => requests.get('/story/'),
    updateStoryStatus: (story) => {
        const instance = axios.create()
        instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
        return instance.patch(`/story/${story.id}`, story);
    }
}

/*
// Hard code
const Story = {
    createStory: (story) => Promise.resolve(),
    getStory: (user) => {
        return Promise.resolve(
        [{
            createdBy: 2,
            summary: '1st story created by 2',
            description: 'dummy desc',
            type: 'enhancement',
            complexity: 'high',
            estimatedHrs: 1,
            cost: 100,
            status: 'pending'
            },{
            createdBy: 3,
            summary: '2st story created by 3',
            description: 'dummy desc',
            type: 'enhancement',
            complexity: 'high',
            estimatedHrs: 2,
            cost: 100,
            status: 'accepted'
            },
            {
                createdBy: 2,
                summary: '2st story created by 3',
                description: 'dummy desc',
                type: 'enhancement',
                complexity: 'high',
                estimatedHrs: 2,
                cost: 100,
                status: 'rejected'
            }
        ].filter(story => user.userRoles.includes('Admin') || story.createdBy === user.id  )
    )
    }
}


const Auth = {
    login: (email, password) => Promise.resolve(
        {
            userRoles: ['User'],
            firstName: 'Alpha',
            lastName: 'User',
            id: 2
        }
    ),
    adminLogin: (email, password) => Promise.resolve({
        userRoles: ['Admin'],
        firstName: 'Alpha',
        lastName: 'User',
        id: 3
    })
}
*/

export default {
    Auth,
    Story,
    setToken: _token => { token = _token }
};