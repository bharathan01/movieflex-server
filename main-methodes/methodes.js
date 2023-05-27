const movieDataModel = require("../data-models/moviedatamodel.js")
const registerModel = require('../data-models/register.js')
const bcrypt = require('bcrypt')
const jwsToken = require('jsonwebtoken')


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
   const email = userData.email

   const data = await registerModel.findOne({ email: userData.email })
   if (email == userData.email) {
      const pass = await bcrypt.compare(userData.password, data.password)
      if (pass) {
         

         return{
            message: 'LOGIN SUCCESS'
         }
      }
      else {
         return {
            message: 'password is invalid..'
         }
      }
   }
   else {
      return {
         message: 'invalid email..'
      }
   }

   //   return  registerModel.findOne({email:userData.email}).then(data =>{
   //       if(data){
   //          if(email == data.email){
   //               hash = bcrypt.compare(userData.password,data.password ,   pass =  (err ,result) =>  {
   //               return result
   //            } )
   //             console.log(pass);
   //             if(hash){
   //                loginUserData = {
   //                   username:data.username,
   //                   email:data.email
   //                }

   //                return{
   //                   loginUserData,
   //                   message:'login Successfull...'
   //                } 
   //             } 
   //             else{
   //                return{
   //                   message:'enterd password is incorrect..'
   //                }
   //             }
   //          }
   //          else{
   //             return{
   //                message:'Enter correct email'
   //             }
   //          }
   //       }
   //       else{
   //          return{
   //             message:'Somethig Went Wrong ! please try again leater..'
   //          }
   //       }
   //    })
}
module.exports = {
   getMovieDetails, getSingleMovieDetails, registerUser, logInUser
}