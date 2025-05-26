import React, {useState} from 'react'

const LoginPage = () => {
    const [email, setEmail]  = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoding] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        if(!email || !password){
            setError('Email and password are required')
            return;
        }
        setError('')
        setLoding(true)

        setTimeout(()=>{
            console.log('Email :', email)
            console.log('Password:', password)
            setLoding(false)
        },2000)
        

    }
  return (
    <div style={{ maxwidth: '400px', margin: '0 auto', padding:'20px' }}>
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
                <button type="Submit" disabled={loading}>{loading? 'loading in...': 'Login'}</button>
            </div>
        </form>
    </div>
  )
}

export default LoginPage