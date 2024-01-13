const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email: String,
    password: String,
    secret: String,
    claims: [String], // Roles or permissions
})
module.exports=mongoose.model('user',userSchema)