const movieDataModel = require("../data-models/moviedatamodel.js")
const registerModel = require('../data-models/register.js')
const bcrypt = require('bcrypt')
const jwsToken = require('jsonwebtoken')
const dotenv = require('dotenv')
const reviewModel = require('../data-models/moviereview.js')

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

uploadReview = async(data) =>{
   const result = await reviewModel.create(data)
   if(result){
      return{
         statusCode:200,
         message:'uploded successfully'
      }

   }
   else{
      return{
         message:'somthing went wrong...'
      }
   }

}
getReviewData = async()=>{
   const data  = await reviewModel.find()
   if(data){
      return{
         data
      }
   }
   else{
      return{
         message:'somthing went wrog...'
      }
   }
}
deleteReview =(_id) => {
  return reviewModel.deleteOne({_id}).then(data =>{
   if(data){
     return{
      statusCode:200,
      message:'Review deleted successfully..'
     }
   }
   else{
      return{
         statusCode:400,
         message:'somthing went wrong..plase try after some time'
      }
   }
   })
}
getReview = async(_id) =>{
   data = await reviewModel.findById({_id})
   if(data){
      return {
         data,
         statusCode:200
      }
   }
   else{
      return{
         statusCode:400
      }
   }

}
/*updatedata = async(_id,data) =>{
   data = await registerModel.findByIdAndUpdate(_id,{reviewheading:data.reviewheading})
   if(data){
      return{
         statusCode:200,
         message:'updated successfully',
         data
      }
   }
   else{
      return{
         statusCode:400,
         message:'something went wrong plase try after some time'
      }
   }

}*/
module.exports = {
   getMovieDetails, 
   getSingleMovieDetails,
    registerUser,
     logInUser,
     uploadReview,
     getReviewData,
     deleteReview,
     getReview
}