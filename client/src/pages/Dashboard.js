import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import '../styles/Dashboard.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import BalanceCard from '../components/BalanceCard'
import TransactionList from '../components/TransactionList'

const Dashboard = () => {

  const [user, setUser] = useState('')
  const balance= 3540.00
  const income = 5000.00
  const expense = 1460.00

    const transactions = [
    { description: 'Salary', amount: 3000, type: 'income' },
    { description: 'Freelance Project', amount: 2000, type: 'income' },
    { description: 'Groceries', amount: 250, type: 'expense' },
    { description: 'Rent', amount: 1200, type: 'expense' },
    { description: 'Coffee', amount: 10, type: 'expense' },
  ];
 
  
  useEffect(() => {
    const userString = localStorage.getItem('user')
    // console.log('userString: ',userString)
    if (userString) {
      const userObj = JSON.parse(userString)
      // console.log("userObj: ",userObj)
      setUser(userObj.name)
    }
  }, [])

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <h1>Welcome to the Dashboard, {user}!</h1>
        <p>Here you can track your expenses and view reports.</p>
        <BalanceCard balance={balance} income={income} expense={expense} />
        <TransactionList transactions={transactions}/>
      </div>
    </div>
  );
}

export default Dashboard
