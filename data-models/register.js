const mongoose = require('mongoose')

const registerNewUser = mongoose.model('userdata',{
    name:{type:String},
    username:{type:String},
    email:{type:String},
    password:{type:String}

})
module.exports =registerNewUser
 