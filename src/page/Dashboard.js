import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/user'
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [fName, setFname] = useState('');
  const rFName = (user) => {
    setFname(user.firstName)
  }
  console.log("Auth--->", auth);
  useEffect(() => {
    if (auth) rFName(auth)
  }, [auth])
  const handleLogout = () => {
    localStorage.removeItem('auth1');
    alert("Logout Successfully");
    navigate('/login')
  }
  return (
    <>
      {/* <div>Welcome to Dashboard Page Mr. {fName? fName : "Unknown"} and your role is {auth?.role === 0 ? "Employee" : auth?.role ===1 ? "Manager" : "Guest"}</div>
      First Name : {auth?.firstName}<br/>
      Last Name: {auth?.lastName}<br/>
      Email: {auth?.email}<br/>
      Role: {auth?.role ===0 ? 'Employee' : ""}<br/>
      <button className='btn btn-primary' onClick={handleLogout}>{auth && "Logout"}</button> */}
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Dept.Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{auth?.firstName}</td>
              <td>{auth?.lastName}</td>
              <td>{auth?.email}</td>
              <td>{auth?.role === 0 ? 'Employee' : ""}</td>
              <td>{auth?.dept}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className='btn btn-primary' onClick={handleLogout}>{auth && "Logout"}</button>
    </>
  )
}

export default Dashboard