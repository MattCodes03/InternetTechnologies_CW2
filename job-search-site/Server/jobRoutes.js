import express from 'express';
import { getDB } from './connect.js';
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
import axios from 'axios';
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

// SEARCH JOBS API
jobRoutes.route("/jobs/api/search").post(verifyToken, async (request, response) => {
    
    const api = `https://www.reed.co.uk/api/1.0/search?keywords=${request.body.keywords}&locationName={request.body.locationName}&distancefromlocation=${request.params.distanceFromLocation}&partTime=${request.body.partTime}&fullTime=${request.body.fullTime}&minimumSalary=${request.body.minimumSalary}&maximumSalary=${request.body.maximumSalary}&resultsToTake=10`
    const username = process.env.REED_API_KEY
    const { data } = await axios.get(api, {
        auth: {
            username: username,
            password: ''
        }
    })

    if(Array.isArray(data?.results) && data.results.length > 0)
    {
        response.json(data.results)
    }else
    {
        response.json({ message: "No Data Found" });
    }
})

// SEARCH DATABASE
jobRoutes.route("/jobs/search").post(verifyToken, async (request, response) => {
    const database = getDB();

    const filters = request.body;
 
    const dbQuery = {};

    if (filters.keywords) {
        dbQuery.keywords = filters.keywords; // Regex search for keywords
    }

    // If 'locationName' is provided, search by location (case-insensitive)
    if (filters.locationName) {
        dbQuery.locationName = filters.locationName; // Regex search for location
    }

    if (filters.partTime !== undefined) {
        dbQuery.partTime = filters.partTime;
    }

    if (filters.fullTime !== undefined) {
        dbQuery.fullTime = filters.fullTime;
    }

    if (filters.minimumSalary) {
        dbQuery.minimumSalary = Number(filters.minimumSalary);
    }


    if (filters.maximumSalary) {
        dbQuery.maximumSalary = Number(filters.maximumSalary);
    }



    let data = await database.collection("jobs").find(dbQuery).toArray()
    if(data.length > 0)
    {
        response.json(data)
    }else
    {
        response.json({ message: "No Data Found" });
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