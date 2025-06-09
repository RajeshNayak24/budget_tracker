import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './../styles/LoginPage.css'



const LoginPage = () => {
    const [email, setEmail]  = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoding] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        
        if(!email || !password){
            setError('Email and password are required')
            return;
        }
        setError('')
        setLoding(true)
        try {
            const response = await axios.post('http://localhost:5050/login', { 
                email, 
                password 
            })
            console.log('Backend Response:',response.data);
            // alert('Login success')
            const {token,user} =  response.data

            if(token && user){
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/dashboard')
            }else{
                setError('Unexpected response from server')
            }

        } catch (error) {
            console.log(error)
            setError('Invalid email or password')
        }finally{
            setLoding(false)
        }
};

  return (
    <div className="login-container">
        <h2>LoginPage</h2>
        {error && <p className='error'>{error} </p>}
        <form onSubmit = {handleSubmit}>
            <div className="email">
                <label htmlFor='email'>Email:</label><br/>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (error && e.target.value && password) setError('');
                    }}
                />
            </div>
            <div className='password'>
                <label htmlFor="password" >Password:</label><br/>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if(error && e.target.value && email) setError('');
                    }}
                />
            </div>
            <div>
                <button className="login-button"
                    type="Submit" 
                    disabled={loading}>{loading? 'loading in...': 'Login' }
                </button>
            </div>
        </form>
    </div>
  )
}

export default LoginPage