import { createJob } from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function CreateJobForm()
{

    const navigate = useNavigate()

    const [job, setJob] = useState({
        jobTitle: "",
        jobDescription: "",
        keywords: "",
        locationName: "",
        partTime: false,
        fullTime: false,
        minimumSalary: 0,
        maximumSalary: 0,
        employerName: "Test Company",
        employerID: 0,
        expiryDate: "",
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        setJob({...job, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const response = await createJob(job)
        console.log(response)
        if(response)
        {
            navigate("/home")
        }else
        {
            alert("Job Creation Failed")
        }
    }

    return (
        
        <form className="registerForm" onSubmit={handleSubmit}>
            <h3 className="formTitle">Create a Job</h3>
            <input name="jobTitle" maxLength={20} placeholder={"Title"} onChange={handleChange} required/>
            <input name="jobDescription" maxLength={500} placeholder={"Description"} onChange={handleChange} required></input>
            <input name="keywords" maxLength={20} placeholder={"Keywords (Space Seperated)"} onChange={handleChange} required/>
            <input name="locationName" maxLength={20} placeholder={"Town or City"} onChange={handleChange} required/>

            <label>
          <input
            type="checkbox"
            name="partTime"
            onChange={handleChange}
          />
          Part-time
        </label>
        <label>
          <input
            type="checkbox"
            name="fullTime"
            onChange={handleChange}
          />
          Full-time
        </label>
        <input
          type="number"
          name="minimumSalary"
          placeholder="Min Salary"
          onChange={handleChange}
          className="job-search-input-salary"
        />
        <input
          type="number"
          name="maximumSalary"
          placeholder="Max Salary"
          onChange={handleChange}
          className="job-search-input-salary"
        />
            <input name="expiryDate" maxLength={20} placeholder={"Date of Expiriy"} onChange={handleChange} required/>

            <button className="formButton" type="submit">Create</button>
        </form>
)
}