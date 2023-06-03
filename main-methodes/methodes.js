const movieDataModel = require("../data-models/moviedatamodel.js")
const registerModel = require('../data-models/register.js')
const bcrypt = require('bcrypt')
const jwsToken = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
priveat_key = process.env.PRIVEAT_KEY

getMovieDetails = () => {
   return movieDataModel.find().then(data => {
      return {
         statusCode: 200,
         data
      }
   })
}
getSingleMovieDetails = (movieId) => {

   return movieDataModel.findById(movieId).then(data => {
      if (data) {
         return {
            data,
            status: true
         }
      }
      else {
         return {
            status: false
         }
      }
   })
}
registerUser = (userDetails) => {
   return registerModel.findOne({ email: userDetails.email }).then(data => {
      if (data) {
         return {
            status: false,
            message: 'user already present'
         }
      }
      else {
         bcrypt.hash(userDetails.password, 10).then(pass => {

            hashpassword = pass
            return {
               hashpassword
            }
         })
         const userdata = {
            name: userDetails.name,
            username: userDetails.username,
            email: userDetails.email,
            password: hashpassword
         }
         const udata = new registerModel(userdata)
         udata.save()
         return {
            status: true,
            message: 'account created successfully..'
         }

      }
   })
}

logInUser = async (userData) => {
   
   const data = await registerModel.findOne({ email:userData.email })
   if (data.email == userData.email) {
      loginEmail = data.email
      const pass = await bcrypt.compare(userData.password, data.password)
      if (pass) {
         token = jwsToken.sign({loginEmail},priveat_key)
        
         return{
            statusCode:200,
            message: 'LOGIN SUCCESS',
            email:data.email,
            name:data.username,
            token
            
         }
      }
      else {
         return {
            statusCode:400,
            message: 'password is invalid..'
         }
      }
   }
   else {
      return {
         statusCode:400,
         message: 'invalid email..'
      }
   }
}
module.exports = {
   getMovieDetails, getSingleMovieDetails, registerUser, logInUser
}