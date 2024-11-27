import { createUser } from "../api"
import { useState } from "react"

export function CreateUser()
{

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
        password: "",
        type: "JobSeeker",
    })

    function handleChange(e)
    {
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let response = await createUser(user)
        console.log(response)
        if(response.status != 200)
        {
            alert("Account Creation Failed!")
        }
    }

    return (
        
        <form className="registerForm" onSubmit={handleSubmit}>
            <h3 className="formTitle">Register</h3>
            <input name="firstname" maxLength={20} placeholder={"Firstname"} onChange={handleChange} required/>
            <input name="lastname" maxLength={20} placeholder={"Lastname"} onChange={handleChange} required/>
            <input name="phonenumber" maxLength={11} placeholder={"Phone Number"} onChange={handleChange} required/>
            <input name="email" type="email" placeholder={"Email"} maxLength={50}  onChange={handleChange} required/>
            <input name="password" type="password" placeholder={"Password"} maxLength={20}  onChange={handleChange} required/>

            <button className="formButton" type="submit">Register</button>
        </form>
)
}