import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/user'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
const ManagerDashboard = () => {
    const navigate = useNavigate();
    const [auth] = useAuth();
    // const [fName, setFname] = useState('');
    const [empData, setEmpData] = useState([]);
    const [dept, setDept] = useState('');
    const [dataByPage, setDataByPage] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    // const rFName = (user) => {
    //     setFname(user.firstName)
    // }
    // console.log("Auth--->", auth);
    // useEffect(() => {
    //     if (auth) rFName(auth)
    // }, [auth])
    // all employee fetched
    const getAllEmployee = async () => {
        try {
            let { data } = await axios.get('http://localhost:9090/all-employee', {
                headers: {
                    Authorization: auth?.token
                }
            })
            if (data?.statusCode === 0) {
                setEmpData(data?.data)
                setTotalCount(data?.data.slice(0, Math.ceil((data?.data.length / 2))))
            }
            else {
                setEmpData([])
            }

        } catch (error) {
            console.log("Error occured in employee Feyched--->", error);
        }
    }
    useEffect(() => {
        if (auth) getAllEmployee()
    }, [auth])

    const handleDelete = async (id) => {

        if (window.confirm("Are you sure want to delete employee?")) {
            let resp = await axios.delete(`http://localhost:9090/delete-employee/${id}`, {
                headers: {
                    Authorization: auth?.token
                }
            })
            if (resp?.data.statusCode === 0) {
                alert("Data deleted Successfully")
                getAllEmployee();
                navigate('/m-dashboard')
            }
            else {
                alert("Unable to delete data")
            }
        }
        else {
            alert("Press ok to back")
        }
    }
    // handle pagination
    const handlePage = async (page) => {
        let resp = await axios.get(`http://localhost:9090/get-by-page/${page}`, {
            headers: {
                Authorization: auth?.token
            }
        })
        if (resp?.data.statusCode === 0) {
            setDataByPage(resp?.data?.data)
            navigate('/m-dashboard')
        }
    }
    const handleDept = async (dept, id) => {
        try {
            let resp = await axios.put(`http://localhost:9090/assign-dept/${id}`, { dept }, {
                headers: {
                    Authorization: auth?.token
                }
            })
            if (resp?.data.statusCode === 0) {
                alert("Dept assigned succesfully")
                navigate('/m-dashboard')
            }
            else {
                alert("Not able to assign department")
            }
        } catch (error) {
            console.log("Error occured in dept--->", error);
        }

    }
    return (
        <>
            <Navbar />
            {/* <div className="d-flex justify-content-end">
                <Link className='btn btn-success' to='/addEmp'>+Add Employee</Link>
            </div> */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Hobbies</th>
                        <th scope="col">Role</th>
                        <th scope="col">Dept.Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataByPage.length > 0 ? (
                            dataByPage?.map((emp, index) => (
                                <tr key={index}>
                                    <th scope="row" key={index + 1}>{index + 1}</th>
                                    <td>{emp.firstName}</td>
                                    <td>{emp.lastName}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.gender}</td>
                                    <td>{emp.hobbies}</td>
                                    <td>{emp.role}</td>
                                    <td>
                                        <select value={emp.dept} onChange={(e) => setDept(e.target.value)} className="form-select" aria-label="Default select example">
                                            <option value="">---Choose Department---</option>
                                            <option value="it">IT</option>
                                            <option value="hr">HR</option>
                                            <option value="operation">Operation</option>
                                            <option value="finance">Finance</option>
                                        </select>
                                        <button onClick={() => handleDept(dept, emp._id)} className='btn btn-primary'>Assign</button>
                                    </td>
                                    <td>
                                        <Link to={`/edit-employee/${emp._id}`} className='btn btn-primary'>Edit</Link>
                                        <Link onClick={() => handleDelete(emp._id)} className='btn btn-danger'>Delete</Link>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            empData?.map((emp, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{emp.firstName}</td>
                                    <td>{emp.lastName}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.gender}</td>
                                    <td>{emp.hobbies}</td>
                                    <td>{emp.role}</td>
                                    <td>
                                        <select defaultValue={emp.dept} onChange={(e) => setDept(e.target.value)} className="form-select" aria-label="Default select example">
                                            <option value="">---Choose Department---</option>
                                            <option value="it">IT</option>
                                            <option value="hr">HR</option>
                                            <option value="operation">Operation</option>
                                            <option value="finance">Finance</option>
                                        </select>
                                        <button onClick={() => handleDept(dept, emp._id)} className='btn btn-primary'>Assign</button>
                                    </td>
                                    <td>
                                        <Link to={`/edit-employee/${emp._id}`} className='btn btn-primary'>Edit</Link>
                                        <Link onClick={() => handleDelete(emp._id)} className='btn btn-danger'>Delete</Link>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" style={{ display: "flex" }}>
                            {totalCount?.map((i, index) => (
                                <Link key={index} className="page-link" onClick={() => handlePage(`${index + 1}`)}>{index + 1}</Link>
                            ))}
                        </li>
                        {/* <li className="page-item"><Link className="page-link" onClick={() => handlePage('2')}>2</Link></li> */}
                        {/* <li className="page-item"><Link className="page-link" onClick={() => handlePage('3')}>3</Link></li> */}
                    </ul>
                </nav>


            </table>

        </>
    )
}

export default ManagerDashboard