import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Dashboard.css'

const Dashboard = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState('')
  
  useEffect(() => {
    const userString = localStorage.getItem('user')
    // console.log('userString: ',userString)
    if (userString) {
      const userObj = JSON.parse(userString)
      // console.log("userObj: ",userObj)
      setUser(userObj.name)
    }
  }, [])
  
  const handleLogout =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className='dashboard-container'>
        <h2>Welcome back, {user} 🎉</h2>
        <p>You are now logged in!</p>

        <div>
          <button 
            onClick={handleLogout}
            className='logout-button'
          >
            Logout
          </button>
        </div>
    </div>
  )
}

export default Dashboard
