import { useEffect, useState } from "react";
import { getJobs } from "../api";
import { JobSearch } from "../Components/JobSearch";

export function Home() {


    return (
        <>
            <JobSearch/>
        </>
    );
}
