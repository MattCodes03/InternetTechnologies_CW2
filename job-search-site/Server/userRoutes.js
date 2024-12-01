import express from 'express';
import { getDB } from './connect.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

let userRoutes = express.Router()
userRoutes.use(express.json());

const SALT_ROUNDS = 10

// Routes
// 1. Retrieve All Users
// 2. Retrieve One User
// 3. Create One User
// 4. Update One User
// 5. Delete One User
// 6. Verify User

// RETRIEVE ALL
userRoutes.route("/users").get(async (request, response) => {
    const database = getDB();
    let data = await database.collection("users").find({}).toArray()
    if(data.length > 0)
    {
        response.json(data)
    }else
    {
        throw new Error("Data was not found!")
    }
})

// RETRIEVE ONE
userRoutes.route("/users/:id").get(async (request, response) => {
    const database = getDB();
    let data = await database.collection("users").findOne({_id: new ObjectId(request.params.id)})
    if(Object.keys(data).length > 0)
    {
        response.json(data)
    }else
    {
        throw new Error("Data was not found!")
    }
})



// UPDATE
userRoutes.route("/users/:id").post(async (request, response) => {
    const database = getDB();

    let newUser = {
        firstname:request.body.firstname,
        lastname:request.body.lastname,
        phonenumber:request.body.phonenumber,
        email:request.body.email,
        password:request.body.password,
        type:request.body.type,
        dateCreated:request.body.dateCreated
    }

    let data = await database.collection("users").updateOne({_id: new ObjectId(request.params.id)}, newUser)
    response.json(data)
})

// DELETE
userRoutes.route("/users/:id").delete(async (request, response) => {
    const database = getDB();
    let data = await database.collection("users").deleteOne({_id: new ObjectId(request.params.id)})
    response.json(data)
})

// CREATE
userRoutes.route("/register").post(async (request, response) => {
    const database = getDB();

    const takenEmail = await database.collection("users").findOne({email: request.body.email})
    if(takenEmail)
    {
        response.json({message: "Email already in use"})
    }else
    {

    const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS)

    let newUser = {
        firstname:request.body.firstname,
        lastname:request.body.lastname,
        phonenumber:request.body.phonenumber,
        email:request.body.email,
        password:hash,
        type:request.body.type,
        dateCreated:request.body.dateCreated || new Date().toISOString()
    }

    let data = await database.collection("users").insertOne(newUser)
    const token = jwt.sign(user, process.env.JWT_KEY, {expiresIn: "10h"})
    response.json({success: true, token})
}
})

// Verify
userRoutes.route("/user/login").post(async (request, response) => {
    const database = getDB();

    const user = await database.collection("users").findOne({email: request.body.email})
    

    if(user)
    {
        let confirmation = await bcrypt.compare(request.body.password, user.password)
        if(confirmation)
        {
            const token = jwt.sign(user, process.env.JWT_KEY, {expiresIn: "10h"})
            response.json({success: true, token})
        }else
        {
            response.json({success: false, message: "Incorrect Login Details"})
        }
    }else
    {
        response.json({success: false, message: "Incorrect Login Details"})
    }
})

export default userRoutes;