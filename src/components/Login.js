import React, { useState } from 'react';
// import { Col, Row } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/user'
import axios from 'axios'
import './signup.css'
import Navbar from '../page/Navbar';
const Login = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post('http://localhost:9090/login-employee', { email, password });
            if (result?.data?.statusCode === 0) {
                toast.success(`${result.data.message}`)
                setAuth(result?.data?.data)
                localStorage.setItem('auth1', JSON.stringify(result?.data?.data))
                if (result?.data?.data?.role === 1) {
                    navigate('/m-dashboard')
                }
                else {
                    navigate('/dashboard')
                }
            }
            else {
                toast.error(`${result.data.message}`)
            }

        } catch (error) {
            console.log("Error happend in frontedn--->", error);
            toast.error('Something went Wrong...please try again...')
        }

    }
    return (
        <>
            <Navbar />
            <div className='box'>
                <form onSubmit={formSubmit}>
                    <div onChange={(e) => setEmail(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div onChange={(e) => setPassword(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <Link to="/signup">Don't have a account Sign Up here</Link>
            </div>
        </>


    );

}

export default Login