const User = require('../models/user');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const router=require('express').Router()

// Generate secret, create OTP URI, and send it to the client
router.post('/register', async (req, res) => {
    try {
      const user = new User({
        email: req.body.username,
        password: req.body.password,
        secret: speakeasy.generateSecret().base32,
        claims: ['user'], // Default claim
      });
  
      await user.save();
  
      const secret = speakeasy.generateSecret({ length: 20 }); 
  
// Generate a TOTP code using the secret key 
const code = speakeasy.totp({ 
  
    secret: secret.base32, 
  
    encoding: 'base32'
}); 

console.log(code)

//we will send this OTP to user email

res.json('OTP sent')
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Verify OTP endpoint
  router.post('/verify', (req, res) => {
    const { email, token } = req.body;
  
    
   const userRecord= User.findOne({ email });
   if (!userRecord) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const verified = speakeasy.totp.verify({
    secret: userRecord.secret,
    encoding: 'base32',
    token,
  });
  

  if (verified) {
    res.json({ message: 'OTP verification successful',action:'success' });
    console.log('verify')
  } else {
    res.status(401).json({ error: 'Invalid OTP',action:'error' });
    console.log('invalid')

  }
  });


  function checkClaims(claims) {
    return (req, res, next) => {
      const userClaims = req.user ? req.user.claims : [];
      const authorized = claims.every((claim) => userClaims.includes(claim));
  
      if (authorized) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
    };
  }

  router.get('/:protected-route', checkClaims(['admin']), (req, res) => {
    res.json({ message: 'Authorized access' });
  });
  module.exports=router