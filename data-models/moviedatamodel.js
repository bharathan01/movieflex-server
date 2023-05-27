const mongoose = require('mongoose')

const moviedata = mongoose.model('moviedata',{
  movename:{type:String},
  discription:{type:String},
  releasedate:{type:Date},  
},'moviedatas')


module.exports = moviedata