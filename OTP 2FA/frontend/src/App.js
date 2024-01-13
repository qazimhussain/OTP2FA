import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [OtpGenerate, setOTPGenerate] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/register', { email, password });
      setOTPGenerate(true);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleVerify = async () => {
    try {
      await axios.post('/verify', { email, otp });
      console.log('OTP verification successful');
    } catch (error) {
      console.error('Error during OTP verification:', error);
    }
  };

  return (
    <form className='Otp-block' onSubmit={(e)=>{handleRegister(e)}}>
      <h1>OTP Authentication</h1>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type='submit' >Register</button>
      <br />
      {OtpGenerate &&
     <>
      <label>
        OTP Token:
        <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />
      </label>
      <br />
      <button type='button' onClick={handleVerify}>Verify OTP</button>
      </>
}
    </form>
  );
}

export default App;

