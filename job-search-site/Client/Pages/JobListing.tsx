import { useLocation } from "react-router-dom";



export function JobListing()
{
    const location = useLocation();
    const job = location.state?.job; // Access the job object

  
    return (
      <div>
        {job ? (
          <div className="job-listing">
            <h1 className="job-title">{job.jobTitle}</h1>
            <p className="job-info">Expiry Date: {job.expirationDate}</p>

            <div className="job-info-container">
            <div className="job-info-row">
            <p className="job-info">Salary: {job.minimumSalary} - {job.maximumSalary}</p>
            <p className="job-info">Location: {job.locationName}</p>
            </div>

            <div className="job-info-row">
            <p className="job-info">Job Type: {job.partTime ? 'Part-Time' : 'Full-Time'}</p>
            <p className="job-info">Employer: {job.employerName}</p>
            </div>

            </div>

            <div className="job-description-container">
            <h3>About this role</h3>
            <p className="job-description">{job.jobDescription}</p>
            </div>

            <div className="job-location-container">
            <h3>Location</h3>
            
            <img className="map-image" src="assets/map.png"/>
            </div>
            <div className="job-buttons">
              <br />
              <div className="row">
              <button className="job-button">Apply Now</button>
              <button className="job-button">Contact Employer</button>
              </div>
            </div>

          </div>
        ) : (
          <p>No job details available</p>
        )}
      </div>
    )
  };