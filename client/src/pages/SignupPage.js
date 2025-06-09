import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../styles/SignupPage.css'

const SignupPage = () => {
    const [name, setName] = useState('');   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoding] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setError('All fields are required');
            return;
        } 
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!email.includes('@')) {
            setError('Invalid email format');
            return;
        }

        console.log('Signup successful');
        setError('');
        setLoding(true)
        try {
            
            const response = await axios.post('http://localhost:5050/signup', {
                name,
                email,
                password,
                confirmPassword,
            });

            console.log('Signup Success:', response.data);
            // alert('Signup successful ✅');
            localStorage.setItem('token', response.data.token);
            

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            navigate('/login');
        } catch (err) {
            
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            }else {
                setError('Signup failed. Try again.');
            }
        } finally {
            setLoding(false);   
        }
        
    }
    return (
    <div className='signup-container'>
        <h2>Create an Account 📝</h2>
        {error && (
            <div className='error-message'>{error}</div>
        )}
        <form onSubmit={handleSubmit}>
           <div>
                <label htmlFor='name'>Name:</label><br/>
                <input 
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <br/>
           </div>
           <div>
                <label htmlFor='email'>Email:</label><br/>
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
            </div>
            <div>
                <label htmlFor='password'>Password:</label><br/>
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </div>
            <div>
                <label>confirmPassword:</label><br/>
                <input 
                    type="Password" 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}
                />
            </div>
            <div>
                <button 
                    className="signup-button"
                    type="Submit" 
                    disabled={loading}>{loading? 'Signing up...' : 'Create Account' }
                </button>
            </div>
        </form>

    </div>
  )
}

export default SignupPage