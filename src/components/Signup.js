import React, { useState } from 'react';
// import { Col, Row } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import './signup.css'
import Navbar from '../page/Navbar';
const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [hobbies, setHobbies] = useState('')
    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post('http://localhost:9090/register-employee', { firstName, lastName, email, password, gender, hobbies });
            if (result?.data?.statusCode === 0) {
                toast.success(`${result.data.message}`)
                navigate('/login')

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
            <div className='box' style={{ width: '50%', marginLeft: '200px' }}>
                <form onSubmit={formSubmit}>
                    <div onChange={(e) => setFirstName(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div onChange={(e) => setLastName(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div onChange={(e) => setEmail(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div onChange={(e) => setPassword(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div onChange={(e) => setGender(e.target.value)} className="mb-3" style={{ padding: '5px', border: '1px solid rgb(188, 214, 219)', borderRadius: '5px', width: '30%', marginLeft: '50px' }}>
                        <div className="form-check">
                            <input className="form-check-input" value={'male'} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" value={'female'} type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Female
                            </label>
                        </div>
                    </div>
                    <div onChange={(e) => setHobbies(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Hobbies</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </>


    );

}

export default Signup