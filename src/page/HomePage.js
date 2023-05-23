import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/user'

const HomePage = () => {
  const [auth,] = useAuth();
  return (
    <>
      <Navbar />
      <h2>Welcome to Home Page</h2>
      {
        auth ? (
          <Link to={'/m-dashboard'}>Click here to access Dashboard</Link>
        ) : (
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <h6>Already have a Account....Please Login</h6>
              <Link className='btn btn-primary' to={'/login'}>Login</Link>
            </div><br />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <h6>New User ??? please sign up Here</h6>
              <Link className='btn btn-warning' to={'/signup'}>SignUp</Link>
            </div>
          </div>
        )
      }

    </>
  )
}

export default HomePage