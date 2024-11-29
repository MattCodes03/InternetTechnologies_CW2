import { useLocation } from "react-router-dom";

export function JobListing()
{
    const location = useLocation();
    const job = location.state?.job; // Access the job object
  
    return (
      <div>
        {job ? (
          <div>
            <h1>{job.title}</h1>
            <pre>{JSON.stringify(job, null, 2)}</pre> {/* Display the JSON */}
          </div>
        ) : (
          <p>No job details available</p>
        )}
      </div>
    )
  };