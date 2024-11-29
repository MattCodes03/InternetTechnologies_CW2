import { searchForJobs} from "../api"
import { useState } from "react"
import { JobCard } from "./JobCard";
import { useNavigate } from "react-router-dom";

export function JobSearch()
{
    const [jobs, setJobs] = useState([]);

    const navigate = useNavigate()

    const [query, setQuery] = useState({
        keywords: "",
        locationName: "",
        distanceFromLocation: 0,
        partTime: false,
        fullTime: true,
        minimumSalary: 0,
        maximumSalary: 0,

    })

    function handleChange(e)
    {
        const { name, value, type, checked } = e.target;
        setQuery({...query, [name]: type === "checkbox" ? checked : value,});
    }

    function viewJob(job)
    {
      navigate("/job", { state: { job } });
    }



    async function handleSubmit(e) {
        e.preventDefault()

        const response = await searchForJobs(query)
        setJobs(response)
        
    }

    // Search Filters
    // keywords,
    // locationName,
    // distanceFromLocation,
    // partTime,
    // fullTime,
    // minimumSalary,
    // maximumSalary,

  return (
        <>
        <div className="job-search-container">
      <div className="job-search-form">
        {/* Keywords input */}
        <input
          type="text"
          name="keywords"
          placeholder="Find your next career"
          value={query.keywords}
          onChange={handleChange}
          className="job-search-input"
        />

        {/* Location input */}
        <input
          type="text"
          name="locationName"
          placeholder="Postcode"
          value={query.locationName}
          onChange={handleChange}
          className="job-search-input"
        />

        {/* Distance dropdown */}
        <select
          name="distanceFromLocation"
          value={query.distanceFromLocation}
          onChange={handleChange}
          className="job-search-select"
        >
          <option value="5">5mi</option>
          <option value="10">10mi</option>
          <option value="20">20mi</option>
          <option value="50">50mi</option>
          <option value="100">100mi</option>
        </select>
      </div>

      {/* Additional options */}
      <div className="job-search-options">
        <label>
          <input
            type="checkbox"
            name="partTime"
            checked={query.partTime}
            onChange={handleChange}
          />
          Part-time
        </label>
        <label>
          <input
            type="checkbox"
            name="fullTime"
            checked={query.fullTime}
            onChange={handleChange}
          />
          Full-time
        </label>
        <input
          type="number"
          name="minimumSalary"
          placeholder="Min Salary"
          value={query.minimumSalary}
          onChange={handleChange}
          className="job-search-input"
        />
        <input
          type="number"
          name="maximumSalary"
          placeholder="Max Salary"
          value={query.maximumSalary}
          onChange={handleChange}
          className="job-search-input"
        />
      </div>

      {/* Search button */}
      <button onClick={handleSubmit} className="job-search-button">
        Search
      </button>
    </div>

  <div className="job-cards-container">
<div className="job-cards">
{jobs.length > 0 ? (
    jobs.map((job, index) => (
        <JobCard onClick={viewJob} key={index} job={job} />
    ))
) : (
    <p>No jobs found</p>
)}
</div>
</div>
</>
)
}