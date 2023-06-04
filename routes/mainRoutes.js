const express = require('express')
const movieDataModel = require("../data-models/moviedatamodel.js")
const methodes = require("../main-methodes/methodes.js")
const jwtAuth = require('../midddleware/jwtAuth.js')
const reviewModel = require('../data-models/moviereview.js')

const routes = express.Router()

routes.get('/movies', (req,res) => {
    
     methodes.getMovieDetails().then(result =>{
        res.status(result.statusCode).json(result)
        
     }).catch(error => res.status(400).json(error))

    
})
routes.get('/singlemovie/:_id',(req,res) =>{
   methodes.getSingleMovieDetails(req.params._id).then(data =>{
      res.status(200).json(data)
   }).catch(error => res.status(400).json(error))
   })

routes.post('/register' ,(req,res) => {
   methodes.registerUser(req.body).then(data =>{
      res.status(200).json(data)
   }).catch(error => res.status(400).json(error)) 
})
routes.post('/login', (req,res) =>{
   methodes.logInUser(req.body).then(data => {
      res.status(200).json(data)
   }).catch(error => res.status(400).json(error))
})
routes.post('/addPost',jwtAuth,(req,res) =>{
    methodes.uploadReview(req.body).then(data =>{
      res.status(200).json(data)
    }).catch(error => res.status(400).json(error))
})  
routes.get('/getreview',(req,res) =>{
   methodes.getReviewData().then(data =>{
      res.status(200).json(data)
   }).catch(error => res.status(400).json(error))
})
routes.delete('/delete/:_id',jwtAuth,(req,res) =>{
  methodes.deleteReview(req.params._id).then(data =>{
      res.status(200).json(data)
   }).catch(error => res.status(400).json({messge:'somthing wrong ..pleace try after some time'}))
})  
routes.get('/getreview/:_id' ,jwtAuth,(req,res) =>{
   methodes.getReview(req.params._id).then(data =>{
      res.status(200).json(data)
   }).catch(error => res.status(400).json(error))
})
routes.put('/update/:_id',jwtAuth,(req,res) =>{
   reviewModel.findByIdAndUpdate(req.params._id,req.body).then(data =>{
      res.status(200).json({message:'Update successfuly',statusCode:200,data})
   }).catch(error => res.status(400).json({message:'error'}))
})
module.exports = routes  
     