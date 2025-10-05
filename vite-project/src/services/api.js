import axios from "axios";

// Base URL for JSON Server
/* you shall run json-server --watch db.json --port 3001 */
const api_URL= 'http://localhost:3001';
// usi this api to access oll CRUD services
const api= axios.create({
    baseURL: api_URL
});

// functions to be performed on users object
export const userAPI= {
    // get all users
    getAll: () => api.get('/users'),
    // get user by id
    getById: (id) => api.get(`/users/${id}`),
    // create user new
    create: (user) => api.post('/users', user),
    // Login - search by email and password if authinticated 
    validUserLogin: (email, password) => {
        api.get('/users' , {
            params:{
                email: email,
                password: password
            }
        })

    },
    // Register - search if mail exist
    checkMailExist: (email) => {
        api.get('/users' , {
            params:{
                email: email
            }
        })
    }

}

// functions to be performed on posts object
export const postAPI= {
    // get all posts
    getAll: () => api.get('/posts'),
    // get post by id
    getById: (id) => api.get(`/posts/${id}`),
    // create post new
    create: (post) => api.post('/posts', post),
    // update post
    update: (post) => api.put(`/posts/${post.id}`, post),
    // delete post
    delete: (id) => api.delete(`/posts/${id}`)

}

export default api;