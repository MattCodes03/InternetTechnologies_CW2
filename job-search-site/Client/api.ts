import axios from 'axios'

const URL = "http://localhost:3000"

// USERS 

export async function getUsers()
{
    const response = await axios.get(`${URL}/users`)
    if(response.status == 200)
    {
        return response.data
    }else
    {
        return
    }
}

export async function getUser(id: string)
{
    const response = await axios.get(`${URL}/users/${id}`)
    if(response.status == 200)
    {
        return response.data
    }else
    {
        return
    }
}

export async function createUser(user: object)
{
    const response = await axios.post(`${URL}/register`, user)
    
    return response
}

export async function updateUser(id: string, user: object)
{
    const response = await axios.put(`${URL}/users/${id}`, user)
    
    return response
}

export async function deleteUser(id: string)
{
    const response = await axios.delete(`${URL}/users/${id}`)
    
    return response
}

export async function verifyUser(user: object)
{
    const response = await axios.post(`${URL}/user/login`, user)

    if(response.data.success)
    {
        return response.data.token
    }else
    {
        return 
    }
}

// JOBS
export async function getJobs()
{
    const response = await axios.get(`${URL}/jobs`)
    if(response.status == 200)
    {
        return response.data
    }else
    {
        return
    }
}