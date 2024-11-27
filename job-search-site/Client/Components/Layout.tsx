import { NavBar } from "./NavBar"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function Layout()
{
    let user = sessionStorage.getItem("User")
    const navigate = useNavigate()

    useEffect(() => {
        if(!user)
        {
            navigate("/")
        }
    }, [user])
    

    return(
        <>
        <NavBar/>
        <Outlet/>
        </>
    )
}