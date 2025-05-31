import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



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
            const response = await axios.post('http://localhost:5050/login', { email, password })
            console.log('Backend Response:', response.data);
            // alert('Login success')
            
            localStorage.setItem('token', response.data.token)
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            setError('Invalid email or password')
        }finally{
            setLoding(false)
        }
};

  return (
    <div style={{ maxWidth: 'fit-content', margin: 'auto', inline: 'auto', padding:'20px' }}>
        <h2>LoginPage</h2>
        {error && <p style= {{color:'red'}}>{error} </p>}
        <form onSubmit = {handleSubmit}>
            <div style={{marginbottom: '15px'}}>
                <label htmlfor='email'>Email:</label><br/>
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
            <div style = {{marginbottom: '15px'}}>
                <label htmlfor="password" >Password:</label><br/>
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
                    type="Submit" 
                    disabled={loading}>{loading? 'loading in...': 'Login' }
                </button>
            </div>
        </form>
    </div>
  )
}

export default LoginPage