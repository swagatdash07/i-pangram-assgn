import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/user';
import Navbar from './Navbar';

const EditEmpPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [auth] = useAuth();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [hobbies, setHobbies] = useState('')
    const [role, setRole] = useState('')

    // fetch single employee
    const getEmployee = async () => {
        let id = params.id;
        let resp = await axios.get(`http://localhost:9090/get-employee/${id}`, {
            headers: {
                Authorization: auth?.token
            }
        });
        if (resp?.data?.statusCode === 0) {
            console.log("Data fetched Successfully", resp?.data);
            setFirstName(resp?.data?.data?.firstName)
            setLastName(resp?.data?.data?.lastName)
            setEmail(resp?.data?.data?.email)
            setGender(resp?.data?.data?.gender)
            setHobbies(resp?.data?.data?.hobbies)
            setRole(resp?.data?.data?.role)
        }
        else {
            // setUser({})
        }
    }
    useEffect(() => {
        if (params?.id && auth) getEmployee()
    }, [params?.id, auth])
    const formSubmit = async (e) => {
        e.preventDefault();
        let data = {
            firstName,
            lastName,
            email,
            gender,
            hobbies,
            role
        }
        let resp = await axios.put(`http://localhost:9090/update-employee/${params.id}`, data, {
            headers: {
                Authorization: auth?.token
            }
        })
        if (resp?.data?.statusCode === 0) {
            alert("Data Updated Successfully")
            navigate('/m-dashboard')
        }
        else {
            alert("unable to update employee details")
        }
    }
    return (
        <div>
            Welcome to Edit Employee Page
            <Navbar />
            <div className='box' style={{ width: '50%', marginLeft: '200px' }}>
                <form onSubmit={formSubmit}>
                    <div onChange={(e) => setFirstName(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                        <input value={firstName} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div onChange={(e) => setLastName(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                        <input value={lastName} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div onChange={(e) => setEmail(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div onChange={(e) => setGender(e.target.value)} className="mb-3" style={{ padding: '5px', border: '1px solid rgb(188, 214, 219)', borderRadius: '5px', width: '30%', marginLeft: '50px' }}>
                        <div className="form-check">

                            <input className="form-check-input" value={'male'} type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={gender == "male"} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" value={'female'} type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={gender == "female"} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Female
                            </label>
                        </div>
                    </div>
                    <div onChange={(e) => setHobbies(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Hobbies</label>
                        <input value={hobbies} type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div onChange={(e) => setRole(e.target.value)} className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Role</label>
                        <input value={role} type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditEmpPage