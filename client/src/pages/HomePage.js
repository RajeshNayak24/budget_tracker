import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/HomePage.css'

const HomePage = () => {
    const navigate = useNavigate()
  return (
    <div className="homepage-container">
        <h1>Welcome to the Budget Tracker</h1>
        <div className='btn-group'>
            <div>
                <button  className='login-button'
                    onClick={() => {
                        navigate('/login')
                    }}>
                    Login
                </button>
            </div>
            <div>
                <button className='signup-button'
                onClick={() => {
                    navigate('/signup')
                }}>
                Register
                </button>
            </div>
        </div>

    </div>
  )
}

export default HomePage