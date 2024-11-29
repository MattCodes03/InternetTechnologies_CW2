export function JobCard({ job, onClick }) {
    return (
        <div className="job-card" onClick={() => onClick(job)}>
            <h1>{job.jobTitle}</h1>

            <div className="job-details">
                <div className="row">
                    <p>Salary: {job.minimumSalary} - {job.maximumSalary}</p>
                </div>

                <div className="row">
                <p>Location: {job.locationName}</p>
                <p>{job.partTime ? 'Part-Time' : 'Full-Time'}</p>
                </div>
            </div>
        </div>
    );
}