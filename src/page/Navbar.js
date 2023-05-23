import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/user';

const Navbar = () => {
    const navigate = useNavigate();
    const [auth] = useAuth();
    const handleLogout = () => {
        localStorage.removeItem('auth1');
        navigate('/login');
        alert("Logout Successfully");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>MiniHRMS</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav  mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Link</Link>
                            </li>
                        </ul>
                        <div>Welcome to Dashboard Page Mr. {auth?.firstName ? auth?.firstName : "Unknown"} and your role is {auth?.role === 0 ? "Employee" : auth?.role === 1 ? "Manager" : "Guest"}</div>
                        <form className="d-flex">
                            <button className='btn btn-primary m-1' onClick={handleLogout}>Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar