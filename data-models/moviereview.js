const mongoose = require('mongoose')

const movieReviewModle = mongoose.model('Moviereview',
{
    movieId:{type:String},
    username:{type:String},
    email:{type:String},
    reviewheading:{type:String},
    reviewcontent:{type:String},
    date:{type:String},
    rating:{type:Number}
},'Moviereview')

module.exports = movieReviewModle