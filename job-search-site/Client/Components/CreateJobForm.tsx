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
        expirationDate: "",
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
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
        
        <form className="createJobForm" onSubmit={handleSubmit}>
            <h3 className="formTitle">Create a Job</h3>
            <input name="jobTitle" maxLength={30} placeholder={"Title"} onChange={handleChange} required/>

            <textarea name="jobDescription" maxLength={500} placeholder="Description" onChange={handleChange} required rows={8} /* Adjust the number of visible rows */></textarea>

            <input name="keywords" placeholder={"Keywords (Space Seperated)"} onChange={handleChange} required/>
            <input name="locationName" placeholder={"Town or City"} onChange={handleChange} required/>

            <div className="row">
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

        </div>

        <div className="row">
        <input
          type="number"
          name="minimumSalary"
          placeholder="Min Salary"
          onChange={handleChange}
          className="job-create-salary"
        />
     

       
        <input
          type="number"
          name="maximumSalary"
          placeholder="Max Salary"
          onChange={handleChange}
          className="job-create-salary"
        />

</div>
            <input name="expirationDate" type="date" maxLength={20} placeholder={"Date of Expiriy"} onChange={handleChange} required/>

            <button className="formButton" type="submit">Create</button>
        </form>
)
}