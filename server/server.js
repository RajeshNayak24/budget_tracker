const express = require('express');
const cors = require('cors');
const app = express();
const port = 5050;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Budget Tracker!');
});

app.post('/login', (req, res) => {
    console.log('Login attempt:', req.body);
    const {email, password} = req.body;

    if (email === 'admin@example.com' && password === 'password123') {
      // Login successful
      const token = 'dummy-jwt-token';
      const user = { email };
      return res.status(200).json({ 
        message: 'Login successful',
        token,
        user
      });
    } else {
      // Login failed
      return res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});