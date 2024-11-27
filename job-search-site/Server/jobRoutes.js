import express from 'express';
import { getDB } from './connect.js';
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

let jobRoutes = express.Router()
jobRoutes.use(express.json());

// Routes
// 1. Retrieve All Jobs
// 2. Retrieve One Job
// 3. Create One Job
// 4. Update One Job
// 5. Delete One Job
// 6. Search for Jobs

// RETRIEVE ALL
jobRoutes.route("/jobs").get(verifyToken, async (request, response) => {
    const database = getDB();
    let data = await database.collection("jobs").find({}).toArray()
    if(data.length > 0)
    {
        response.json(data)
    }else
    {
        throw new Error("Data was not found!")
    }
})

function verifyToken(request, response, next)
{
    const authHeaders = request.headers["authorisation"]
    const token = authHeaders && authHeaders.split(' ')[1]
    if(!token)
    {
        return response.status(401).json({message: "Authentication Token Missing."})    
    }

    jwt.verify(token, process.env.JWT_KEY, (error, user) => {
        if(error)
        {
            return response.status(403).json({message: "Authentication Token Invalid."}) 
        }

        request.body.user = user
        next()
    })
}

export default jobRoutes;