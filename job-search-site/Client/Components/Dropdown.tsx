import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export function Dropdown({ onLogout }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);
    const profileRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    // Close the dropdown if users clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener("click", handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown">
            <div
                className="profile"
                onClick={toggleDropdown}
                ref={profileRef}
            >
                <img src="assets/profile_icon.svg" alt="Profile" className="profileImage" />
            </div>

            {dropdownOpen && (
                <div className="dropdownMenu" ref={dropdownRef}>
                    <Link to="/home" className="dropdownButton">
                        <button>My Account</button>
                    </Link>

                    <Link to="/home" className="dropdownButton">
                        <button>Settings</button>
                    </Link>

                    <Link to="/createjob" className="dropdownButton">
                        <button>Create a Job</button>
                    </Link>

                    <button onClick={onLogout} className="logoutButton">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
