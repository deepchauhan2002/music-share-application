const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        // If the email already exists, send a response indicating the email is already in use
        return res.status(409).json({ error: 'Email already in use' });
      } else {
        // If the email is not already in use, create a new user
        const user = new User({
          email,
          password,
          userId: uuidv4()
        });

        user.save()
          .then(() =>{
            const token = jwt.sign({email: user.email, password: user.password},'secret-key', { expiresIn: '1h'}) 
            res.status(201).json({ userId:user.userId, token: token})})
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) {
        
        // If the user exists, compare passwords
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign({userId:user.userId},'secret-key', { expiresIn: '1h'})

            return res.status(201).json({ userId:user.userId, token: token})
            // If the passwords match, send a success response
          } else {
            // If the passwords don't match, send an error response
            return res.status(401).json({ error: 'Invalid email or password' });
          }
        });
      } else {
        // If the user doesn't exist, send an error response
        return res.status(401).json({ error: 'Invalid email or password' });
      }
    })
    .catch(err => console.log(err));
};



module.exports = {
  createUser,
  loginUser,
};
