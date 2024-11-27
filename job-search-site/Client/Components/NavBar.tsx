import { Link } from "react-router-dom"
import { pageData } from "./pageData"
import { useNavigate } from "react-router-dom"
import { Dropdown } from "./Dropdown"

export function NavBar()
{
    const navigate = useNavigate()

    function handleLogout()
    {
        sessionStorage.removeItem("User")
        navigate("/")
    }

    return(
        <div className="navbar">
            {pageData.map((page) => {
                return(
                    <Link to={page.path} className="navItem">
                        <button>
                            {page.name}
                        </button>
                    </Link>
                )
            })}

        <Dropdown onLogout={handleLogout} />
        </div>
    )
}