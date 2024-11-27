import { verifyUser } from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Login()
{

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    function handleChange(e)
    {
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await verifyUser(user)
        if(response)
        {
            sessionStorage.setItem("User", response)
            axios.defaults.headers.common["Authorisation"] = `Bearer ${response}`
            navigate("/home")
        }else
        {
            alert("Login Failed")
        }
        
    }

    return (
        <form className="registerForm" onSubmit={handleSubmit}>
            <h3 className="formTitle">Login</h3>
            <input name="email" type="email" placeholder={"Email"} maxLength={50}  onChange={handleChange} required/>
            <input name="password" type="password" placeholder={"Password"} maxLength={20}  onChange={handleChange} required/>
            <button className="formButton" type="submit">Login</button>
        </form>
)
}