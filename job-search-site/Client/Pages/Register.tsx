import { useState } from "react"
import { CreateUser } from "../Components/CreateUser"
import { Login } from "../Components/Login"

export function Register()
{
    // View 0 - Register, View 1 - Login, View 3 - Employer Register
    const [view, setView] = useState(0)

    return (
        <>
          {!view ?
          <> 
            <Login/>
            <span className="formText">Don't have an account?</span><button className="formPrompt" onClick={() => setView(1)}>Register Here</button>
          </> : 
            <> 
            <CreateUser/>
            <span className="formText">Already have an account?</span><button  className="formPrompt" onClick={() => setView(0)}>Login Here</button>
          </> }
        </>
    )
}