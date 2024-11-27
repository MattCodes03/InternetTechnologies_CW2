import { useEffect, useState } from "react";
import { getJobs } from "../api";

export function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
     
        async function fetchData() {
            try {
                const jobs = await getJobs(); 
                setData(jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
}
