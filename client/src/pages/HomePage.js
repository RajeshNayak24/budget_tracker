import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()
  return (
    <div style={{ maxWidth: 'fit-content', margin: 'auto', inline: 'auto', padding:'20px' }}>
        <h1>Welcome to the Budget Tracker</h1>
        <div>
            <button  
            style={{
                marginTop: '1rem',
                padding: '10px 20px',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
                onClick={() => {
                    navigate('/login')
                }}>
                Login
            </button>
        </div>
        <div>
            <button 
            style={{
                marginTop: '1rem',
                padding: '10px 20px',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
            onClick={() => {
                navigate('/signup')
            }}>
            Register
            </button>
        </div>

    </div>
  )
}

export default HomePage