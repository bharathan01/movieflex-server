const express = require('express')
const movieDataModel = require("../data-models/moviedatamodel.js")
const methodes = require("../main-methodes/methodes.js")

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
      // console.log(data) 
   }).catch(error => res.status(400).json(error))
})    
module.exports = routes  
    