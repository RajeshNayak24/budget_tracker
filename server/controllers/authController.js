const users = require('../models/userModel');

const loginUser = (req, res) => {
  console.log('Login attempt:', req.body);
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    return res.status(200).json({
      message: 'Login successful',
      token: 'fake-jwt-token',
      user
    });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

const signupUser = (req, res) => {
  console.log('Signup attempt:', req.body);
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = { name, email, password };
  users.push(user);

  return res.status(201).json({
    message: 'Signup successful',
    token: 'dummytokenforsignup',
    user
  });
};

module.exports = {
  loginUser,
  signupUser
};
