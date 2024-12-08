import { searchForJobs} from "../api"
import { useState } from "react"
import { JobCard } from "./JobCard";
import { useNavigate } from "react-router-dom";

export function JobSearch()
{
    const [jobs, setJobs] = useState<Record<string, any>[]>([]);

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

    function handleChange(e: any) {
      const { name, value, checked, type } = e.target;
    
      if (type === 'checkbox') {
        // Handle checkbox
        setQuery({
          ...query,
          [name]: checked,
        });
      } else {
        // Handle other types like text inputs and select dropdowns
        setQuery({
          ...query,
          [name]: value,
        });
      }
    }

    function viewJob(job: object)
    {
      navigate("/job", { state: { job } });
    }



    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const response = await searchForJobs(query)

        if (Array.isArray(response)) {
          setJobs(response)
        } else {
          console.error(response.message);
      }
        
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
          <form onSubmit={handleSubmit}>
      <div className="job-search-form">
        {/* Keywords input */}
        <input
          type="text"
          name="keywords"
          placeholder="Find your next career..."
          onChange={handleChange}
          className="job-search-input-keywords"
        />

        {/* Location input */}
        <input
          type="text"
          name="locationName"
          placeholder="Town or City..."
          onChange={handleChange}
          className="job-search-input-location"
        />

        {/* Distance dropdown */}
        <select
          name="distanceFromLocation"

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
        <div className="job-search-type">
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
        </div>

        <div className="job-search-salary">
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
        </div>
      </div>

      {/* Search button */}
      <button type="submit" className="job-search-button">
        Search
      </button>
      </form>
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