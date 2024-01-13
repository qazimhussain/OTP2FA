const express = require('express');
const mongoose = require('mongoose');


const app = express();
const otpRouter=require('./router/otpRouter')
const PORT = process.env.PORT || 5222;

mongoose.connect('mongodb://127.0.0.1:27017/otp-auth-2FA', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.once('open', () => console.log('Connected to database'));

// Middleware
app.use(express.json());

// OTP Route

app.use('/api',otpRouter)




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
