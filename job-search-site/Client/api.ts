import axios from 'axios'

// Production const URL = "http://35.178.9.15:3000"

// Development
const URL = "http://127.0.0.1:3000"

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

    if(response.data.success)
    {
        return response.data.token
    }else
    {
        return 
    }
    
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


export async function searchForJobs(filters: object) 
{

    let response: any[] = []

    console.log(filters)

     // Search Database
     const database_response = await axios.post(`${URL}/jobs/search`, filters)
     console.log("Database Response:", database_response.data); 

     if (database_response.data.length > 0) {
         response = [...response, ...database_response.data];
     }

    // Search API
    const api_response = await axios.post(`${URL}/jobs/api/search`, filters)
    console.log("API Response:", api_response.data); 

    if (api_response.data.length > 0) {
        response = [...response, ...api_response.data];
    }

    if(response.length === 0)
    {
            return { message: "No Data Found" };
    }
    
    return response
}

export async function createJob(job: object)
{
    const response = await axios.post(`${URL}/jobs/new`, job)

    if(response.data.success)
    {
        return response
    }else
    {
        return 
    }
    
}