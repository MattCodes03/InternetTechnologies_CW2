import { Link } from "react-router-dom"
import { pageData } from "./pageData"
import { useNavigate } from "react-router-dom"
import { Dropdown } from "./Dropdown"
import { useState } from "react"

export function NavBar()
{
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate()

    function handleLogout()
    {
        sessionStorage.removeItem("User")
        navigate("/")
    }

      // Toggle the menu visibility on mobile
    const toggleMenu = () => {
        setIsMobile((prev) => !prev);
    };

    return (
        <div className="navbar">
              <button className="menu-toggle" onClick={toggleMenu}>
              {isMobile ? "×" : "☰"}
            </button>

            <div className="navbar-logo">
                <Link to="/home">AgriJobs</Link>
            </div>
            <div className={`nav-items ${isMobile ? "active" : ""}`}>
                {pageData.map((page, index) => (
                    <Link to={page.path} key={index} className="navItem">
                        <button>{page.name}</button>
                    </Link>
                ))}
            </div>
            <Dropdown onLogout={handleLogout} />
          
        </div>
    );
}
