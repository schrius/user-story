import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASEURL
/*
const Auth = {
    login: (email, password) => axios.post(
        '/api/login',
        {
            auth: {
                email,
                password
            }
        }),
    adminLogin: (email, password) => axios.post(
        '/api/admin-login',
        {
            auth: {
                email,
                password
            }
        })
}


const Story = {
    createStory: (story) => axios.post('/api/createStory',story),
    getStory: () => axios.get('/api/getStories')
}
*/

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


export default {
    Auth,
    Story
};