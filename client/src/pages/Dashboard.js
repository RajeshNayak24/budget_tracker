import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState('')
  
  useEffect(() => {
    const userString = localStorage.getItem('user')
    // console.log('userString: ',userString)
    if (userString) {
      const userObj = JSON.parse(userString)
      // console.log("userObj: ",userObj)
      setUser(userObj.email)
    }
  }, [])
  
  const handleLogout =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div style={{ maxWidth: 'fit-content', margin: 'auto', inline: 'auto', padding:'20px' }}>
        <h2>Welcome back, {user} 🎉</h2>
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
