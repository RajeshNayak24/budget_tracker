import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate()
  const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div style={{ maxWidth: 'fit-content', margin: 'auto', inline: 'auto', padding:'20px' }}>
        <h2>Welcome to the Dashboard!🎉</h2>
        <p>You are now logged in!</p>

        <div>
          <button 
            onClick={handleLogout}
            style={{
              marginTop: '1rem',
              padding: '10px 20px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
    </div>
  )
}

export default Dashboard
