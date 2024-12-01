import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

type DropdownProps = {
    onLogout: () => void;
  };
  

export function Dropdown({ onLogout }: DropdownProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const profileRef = useRef<HTMLDivElement | null>(null);
    
    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    // Close the dropdown if users clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
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
