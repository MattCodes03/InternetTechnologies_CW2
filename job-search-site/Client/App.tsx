import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { CreateJob } from './Pages/CreateJob'
import { JobListing } from './Pages/JobListing'
import { Home } from './Pages/Home'
import { Register } from './Pages/Register'
import { NavBar } from './Components/NavBar'
import { Layout } from './Components/Layout'
import { useEffect } from 'react'
import axios from 'axios'


function App() {

  // Pages
  // Register
  // Employer Register
  // Login
  // Home Job Search Page
  // Job Listing Page
  // Create Job Listing Page

  // Checking for Auth Headers on page refresh
  useEffect(() => {
    let token = sessionStorage.getItem("User")
    if(token)
    {
      axios.defaults.headers.common["Authorisation"] = `Bearer ${token}`
    }
  },[])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register/>}/>

        <Route element={<Layout/>}>
        <Route path='/home' element={<Home/>}/>
        <Route path='/createjob' element={<CreateJob/>}/>
        <Route path='/job' element={<JobListing/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
